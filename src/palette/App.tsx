import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Oklch, WheelModel, maxChroma, parseHex, toGreyHex, toHex } from './color';
import {
  HARMONIES,
  HarmonyId,
  LightTemp,
  generatePalette,
  harmonyById,
  harmonyHues,
  randomBase,
  valueRamp,
} from './harmony';
import ColorWheel from './ColorWheel';
import Composition from './Composition';
import { TEMPLATES } from './compositions';
import { SavedPalette, Settings, loadSaved, loadSettings, saveSettings, storeSaved } from './storage';
import {
  ChevronLeft,
  ChevronRight,
  ContrastIcon,
  CopyIcon,
  DownloadIcon,
  GridIcon,
  HeartIcon,
  RefreshIcon,
  ShuffleIcon,
  TrashIcon,
} from './icons';

const MIN_COLORS = 2;
const MAX_COLORS = 10;
const MAX_CHROMA = 0.3;

const DEFAULTS: Settings = {
  base: { l: 0.62, c: 0.12, h: 40 },
  count: 5,
  harmony: 'complementary',
  wheel: 'artist',
  temp: 'warm',
};

const textOn = (c: Oklch) => (c.l > 0.68 ? '#1b1a18' : '#ffffff');

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          className={value === o.value ? 'on' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Strip({ colors, className = '' }: { colors: string[]; className?: string }) {
  return (
    <div className={`mini-strip ${className}`}>
      {colors.map((c, i) => (
        <span key={i} style={{ background: c }} />
      ))}
    </div>
  );
}

export default function App() {
  const [settings, setSettings] = useState<Settings>(() => ({ ...DEFAULTS, ...loadSettings() }));
  const { base, count, harmony, wheel, temp } = settings;
  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));
  const setBase = (patch: Partial<Oklch>) => setSettings((s) => ({ ...s, base: { ...s.base, ...patch } }));

  const [saved, setSaved] = useState<SavedPalette[]>(loadSaved);
  const [grey, setGrey] = useState(false);
  const [guides, setGuides] = useState(true);
  const [template, setTemplate] = useState(0);
  const [explore, setExplore] = useState<Oklch[]>(() => Array.from({ length: 6 }, randomBase));
  const [toast, setToast] = useState<string | null>(null);
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const [install, setInstall] = useState<InstallPromptEvent | null>(null);
  const toastTimer = useRef<number>();

  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => storeSaved(saved), [saved]);
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstall(e as InstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const palette = useMemo(() => generatePalette(base, count, harmony, wheel), [base, count, harmony, wheel]);
  const hexes = useMemo(() => palette.map(toHex), [palette]);
  const ramps = useMemo(() => palette.map((c) => valueRamp(c, temp)), [palette, temp]);
  const keyHues = useMemo(() => harmonyHues(base, harmony, wheel, count), [base, harmony, wheel, count]);
  const paint = useCallback((c: Oklch) => (grey ? toGreyHex(c) : toHex(c)), [grey]);
  const info = harmonyById(harmony);
  const baseHex = toHex(base);

  const flash = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1600);
  };
  const copy = async (text: string, label = text) => {
    if (await copyText(text)) flash(`Copied ${label}`);
  };

  const isSaved = saved.some((p) => p.colors.join() === hexes.join());
  const toggleSave = () => {
    if (isSaved) {
      setSaved((list) => list.filter((p) => p.colors.join() !== hexes.join()));
      flash('Removed from saved');
    } else {
      const entry: SavedPalette = { ...settings, id: `${Date.now()}`, colors: hexes, savedAt: Date.now() };
      setSaved((list) => [entry, ...list].slice(0, 60));
      flash('Palette saved');
    }
  };

  // Show the saturation the screen can actually display at this value and hue.
  const chromaPct = Math.round((Math.min(base.c, maxChroma(base.l, base.h), MAX_CHROMA) / MAX_CHROMA) * 100);

  return (
    <div className="app">
      <header className="top">
        <div className="bar">
          <div className="brand">
            <h1>Palette Studio</h1>
            <span>for illustrators</span>
          </div>
          <div className="actions">
            {install && (
              <button
                className="icon-btn"
                aria-label="Install app"
                title="Install app"
                onClick={async () => {
                  await install.prompt();
                  setInstall(null);
                }}
              >
                <DownloadIcon />
              </button>
            )}
            <button className="icon-btn" aria-label="New random palette" title="Shuffle" onClick={() => update({ base: randomBase() })}>
              <ShuffleIcon />
            </button>
            <button
              className={`icon-btn ${isSaved ? 'active' : ''}`}
              aria-label={isSaved ? 'Remove from saved' : 'Save palette'}
              aria-pressed={isSaved}
              title="Save"
              onClick={toggleSave}
            >
              <HeartIcon filled={isSaved} />
            </button>
            <button className="icon-btn" aria-label="Copy all colours" title="Copy all" onClick={() => copy(hexes.join(', '), 'all colours')}>
              <CopyIcon />
            </button>
          </div>
        </div>
        <div className={`strip ${count > 5 ? 'narrow' : ''}`}>
          {palette.map((c, i) => (
            <button
              key={i}
              className="swatch"
              style={{ background: hexes[i], color: textOn(c) }}
              onClick={() => copy(hexes[i])}
              aria-label={`Copy ${hexes[i]}`}
            >
              <span>{hexes[i].toUpperCase()}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <div className="card-head">
            <h2>Colours</h2>
            <output className="value">{count}</output>
          </div>
          <input
            type="range"
            className="range count"
            min={MIN_COLORS}
            max={MAX_COLORS}
            value={count}
            onChange={(e) => update({ count: Number(e.target.value) })}
            aria-label="Number of colours"
          />
          <div className="ticks" aria-hidden>
            {Array.from({ length: MAX_COLORS - MIN_COLORS + 1 }, (_, i) => (
              <span key={i}>{i + MIN_COLORS}</span>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Harmony</h2>
            <Segmented<WheelModel>
              label="Colour wheel"
              value={wheel}
              onChange={(v) => update({ wheel: v })}
              options={[
                { value: 'artist', label: 'Artist RYB' },
                { value: 'digital', label: 'Digital' },
              ]}
            />
          </div>
          <div className="chips" role="radiogroup" aria-label="Colour harmony">
            {HARMONIES.map((h) => (
              <button
                key={h.id}
                role="radio"
                aria-checked={harmony === h.id}
                className={`chip ${harmony === h.id ? 'on' : ''}`}
                onClick={() => update({ harmony: h.id as HarmonyId })}
              >
                {h.name}
              </button>
            ))}
          </div>
          <div className="harmony-body">
            <ColorWheel base={base} keyHues={keyHues} model={wheel} onHueChange={(h) => setBase({ h })} />
            <div className="harmony-text">
              <p className="lead">{info.description}</p>
              <p className="muted">{info.tip}</p>
              <p className="hint">Drag around the wheel to change the base hue.</p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Base colour</h2>
          </div>
          <div className="base-row">
            <label className="picker" style={{ background: baseHex }}>
              <input
                type="color"
                value={baseHex}
                onChange={(e) => {
                  const c = parseHex(e.target.value);
                  if (c) update({ base: c });
                }}
                aria-label="Pick base colour"
              />
            </label>
            <input
              className="hex"
              value={hexDraft ?? baseHex.toUpperCase()}
              onChange={(e) => {
                setHexDraft(e.target.value);
                const c = parseHex(e.target.value);
                if (c) update({ base: c });
              }}
              onBlur={() => setHexDraft(null)}
              spellCheck={false}
              autoCapitalize="characters"
              aria-label="Base colour hex"
            />
          </div>
          <label className="slider-label">
            <span>Value (lightness)</span>
            <output>{Math.round(base.l * 100)}</output>
          </label>
          <input
            type="range"
            className="range"
            min={8}
            max={97}
            value={Math.round(base.l * 100)}
            onChange={(e) => setBase({ l: Number(e.target.value) / 100 })}
            style={{
              background: `linear-gradient(90deg, ${[0.08, 0.3, 0.5, 0.7, 0.97].map((l) => toHex({ ...base, l })).join(', ')})`,
            }}
            aria-label="Lightness"
          />
          <label className="slider-label">
            <span>Saturation (chroma)</span>
            <output>{chromaPct}</output>
          </label>
          <input
            type="range"
            className="range"
            min={0}
            max={100}
            value={chromaPct}
            onChange={(e) => setBase({ c: (Number(e.target.value) / 100) * MAX_CHROMA })}
            style={{
              background: `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map((t) => toHex({ ...base, c: t * MAX_CHROMA })).join(', ')})`,
            }}
            aria-label="Saturation"
          />
        </section>

        <section className="card wide">
          <div className="card-head">
            <h2>Light · mid · shadow</h2>
            <Segmented<LightTemp>
              label="Light temperature"
              value={temp}
              onChange={(v) => update({ temp: v })}
              options={[
                { value: 'warm', label: 'Warm light' },
                { value: 'cool', label: 'Cool light' },
              ]}
            />
          </div>
          <p className="muted small">
            {temp === 'warm'
              ? 'Warm light, cool shadows: lights lean golden, shadows lean blue-violet.'
              : 'Cool light, warm shadows: lights lean toward sky blue, shadows toward red-brown.'}{' '}
            Tap a swatch to copy it.
          </p>
          <div className="ramps" style={{ gridTemplateColumns: `4.2rem repeat(${count}, minmax(0, 1fr))` }}>
            {(['light', 'mid', 'shadow'] as const).map((row) => (
              <div className="ramp-row" key={row} style={{ display: 'contents' }}>
                <span className="ramp-label">{row === 'mid' ? 'Mid' : row[0].toUpperCase() + row.slice(1)}</span>
                {ramps.map((r, i) => {
                  const c = r[row];
                  const hex = toHex(c);
                  return (
                    <button
                      key={i}
                      className="ramp-cell"
                      style={{ background: paint(c), color: textOn(c) }}
                      onClick={() => copy(hex)}
                      aria-label={`${row} ${hex}`}
                    >
                      {count <= 6 && <span>{hex.slice(1).toUpperCase()}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <label className="toggle">
            <input type="checkbox" checked={grey} onChange={(e) => setGrey(e.target.checked)} />
            <span className="switch" aria-hidden />
            Value check (greyscale)
          </label>
        </section>

        <section className="card wide">
          <div className="card-head">
            <h2>Golden ratio composition</h2>
            <div className="tool-row">
              <button
                className={`icon-btn small ${guides ? 'active' : ''}`}
                aria-pressed={guides}
                aria-label="Show φ guides"
                title="Guides"
                onClick={() => setGuides((g) => !g)}
              >
                <GridIcon />
              </button>
              <button
                className={`icon-btn small ${grey ? 'active' : ''}`}
                aria-pressed={grey}
                aria-label="Greyscale value check"
                title="Value check"
                onClick={() => setGrey((g) => !g)}
              >
                <ContrastIcon />
              </button>
            </div>
          </div>
          <div className="frame">
            <Composition
              ramps={ramps}
              paint={paint}
              guides={guides}
              index={template}
              onNext={() => setTemplate((t) => (t + 1) % TEMPLATES.length)}
            />
          </div>
          <div className="frame-nav">
            <button
              className="icon-btn small"
              aria-label="Previous composition"
              onClick={() => setTemplate((t) => (t + TEMPLATES.length - 1) % TEMPLATES.length)}
            >
              <ChevronLeft />
            </button>
            <div className="frame-caption">
              <strong>{TEMPLATES[template].name}</strong>
              <span className="dots" aria-hidden>
                {TEMPLATES.map((_, i) => (
                  <i key={i} className={i === template ? 'on' : ''} />
                ))}
              </span>
            </div>
            <button
              className="icon-btn small"
              aria-label="Next composition"
              onClick={() => setTemplate((t) => (t + 1) % TEMPLATES.length)}
            >
              <ChevronRight />
            </button>
          </div>
          <p className="muted small center">{TEMPLATES[template].note}</p>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Explore</h2>
            <button className="icon-btn small" aria-label="More palettes" title="More" onClick={() => setExplore(Array.from({ length: 6 }, randomBase))}>
              <RefreshIcon />
            </button>
          </div>
          <p className="muted small">
            {info.name} palettes from random starting colours. Tap one to use it.
          </p>
          <div className="explore">
            {explore.map((b, i) => (
              <button key={i} className="explore-item" onClick={() => update({ base: b })} aria-label={`Use palette ${i + 1}`}>
                <Strip colors={generatePalette(b, count, harmony, wheel).map(toHex)} />
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Saved</h2>
            <span className="value">{saved.length}</span>
          </div>
          {saved.length === 0 ? (
            <p className="muted small">Tap the heart at the top to keep a palette here.</p>
          ) : (
            <ul className="saved">
              {saved.map((p) => (
                <li key={p.id}>
                  <button
                    className="saved-main"
                    onClick={() => {
                      const { base: b, count: n, harmony: h, wheel: w, temp: t } = p;
                      update({ base: b, count: n, harmony: h, wheel: w, temp: t });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <Strip colors={p.colors} />
                    <span className="saved-meta">
                      {harmonyById(p.harmony).name} · {p.colors.length} colours
                    </span>
                  </button>
                  <button
                    className="icon-btn small"
                    aria-label="Delete saved palette"
                    onClick={() => setSaved((list) => list.filter((x) => x.id !== p.id))}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="foot">
        UI is kept neutral grey so it doesn’t tint how you see the colours.
      </footer>

      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

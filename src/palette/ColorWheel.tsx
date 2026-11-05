import { useMemo, useRef } from 'react';
import { Oklch, WheelModel, hueToWheel, toHex, wheelToHue } from './color';

interface Props {
  base: Oklch;
  keyHues: number[];
  model: WheelModel;
  onHueChange: (hue: number) => void;
}

const SIZE = 200;
const C = SIZE / 2;
const RING = 84; // radius of the ring's centre line

function point(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: C + r * Math.sin(rad), y: C - r * Math.cos(rad) };
}

export default function ColorWheel({ base, keyHues, model, onHueChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // The ring is drawn in wheel space, so on the artist wheel red sits
  // opposite green and yellow opposite violet.
  const gradient = useMemo(() => {
    const stops = Array.from({ length: 37 }, (_, i) => {
      const angle = i * 10;
      return `${toHex({ l: 0.72, c: 0.15, h: wheelToHue(angle, model) })} ${angle}deg`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }, [model]);

  const handle = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = (Math.atan2(x, -y) * 180) / Math.PI;
    onHueChange(wheelToHue(angle, model));
  };

  const markers = keyHues.map((h) => ({ h, ...point(hueToWheel(h, model), RING) }));
  const baseMarker = point(hueToWheel(base.h, model), RING);

  return (
    <div
      ref={ref}
      className="wheel"
      role="slider"
      aria-label="Base hue"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(hueToWheel(base.h, model))}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 15 : 3;
        const w = hueToWheel(base.h, model);
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onHueChange(wheelToHue(w + step, model));
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onHueChange(wheelToHue(w - step, model));
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        handle(e);
      }}
      onPointerMove={(e) => dragging.current && handle(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="wheel-ring" style={{ background: gradient }} />
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="wheel-svg">
        {markers.length > 1 && (
          <polygon
            points={markers.map((m) => `${m.x},${m.y}`).join(' ')}
            className="wheel-shape"
          />
        )}
        <circle cx={C} cy={C} r={34} fill={toHex(base)} className="wheel-centre" />
        {markers.map((m, i) => (
          <circle key={i} cx={m.x} cy={m.y} r={7} fill={toHex({ ...base, h: m.h })} className="wheel-dot" />
        ))}
        <circle cx={baseMarker.x} cy={baseMarker.y} r={11} fill={toHex(base)} className="wheel-handle" />
      </svg>
    </div>
  );
}

import type { Oklch, WheelModel } from './color';
import type { HarmonyId, LightTemp } from './harmony';

export interface Settings {
  base: Oklch;
  count: number;
  harmony: HarmonyId;
  wheel: WheelModel;
  temp: LightTemp;
}

export interface SavedPalette extends Settings {
  id: string;
  colors: string[];
  savedAt: number;
}

const SETTINGS_KEY = 'palette-studio:settings';
const SAVED_KEY = 'palette-studio:saved';

// Storage can be unavailable (private mode, blocked site data) — the app
// must keep working without it, so every access is guarded.
function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export const loadSettings = () => read<Settings>(SETTINGS_KEY);
export const saveSettings = (s: Settings) => write(SETTINGS_KEY, s);
export const loadSaved = () => read<SavedPalette[]>(SAVED_KEY) ?? [];
export const storeSaved = (list: SavedPalette[]) => write(SAVED_KEY, list);

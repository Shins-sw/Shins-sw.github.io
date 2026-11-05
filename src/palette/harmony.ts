import {
  Oklch,
  WheelModel,
  cuspLightness,
  hueDelta,
  hueToWheel,
  toGamut,
  wheelToHue,
  wrapHue,
} from './color';

export type HarmonyId =
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'split'
  | 'triadic'
  | 'tetradic'
  | 'square';

export interface Harmony {
  id: HarmonyId;
  name: string;
  /** Wheel offsets (degrees) of the harmony's key hues, base first. */
  offsets: number[];
  description: string;
  tip: string;
}

export const HARMONIES: Harmony[] = [
  {
    id: 'monochromatic',
    name: 'Monochromatic',
    offsets: [0],
    description: 'One hue explored through many values and saturations.',
    tip: 'Calm and unified. Value and shape carry the image, so push your lights and darks.',
  },
  {
    id: 'analogous',
    name: 'Analogous',
    offsets: [-30, 0, 30],
    description: 'Neighbouring hues that sit side by side on the wheel.',
    tip: 'Natural and harmonious, like sunset light. Let one hue dominate and keep the others supporting.',
  },
  {
    id: 'complementary',
    name: 'Complementary',
    offsets: [0, 180],
    description: 'Two hues directly opposite each other.',
    tip: 'Maximum contrast and vibrancy. Let one hue dominate and use its complement as the accent.',
  },
  {
    id: 'split',
    name: 'Split complementary',
    offsets: [0, 150, 210],
    description: 'A hue plus the two neighbours of its complement.',
    tip: 'Strong contrast with less tension than a pure complement. Forgiving for beginners.',
  },
  {
    id: 'triadic',
    name: 'Triadic',
    offsets: [0, 120, 240],
    description: 'Three hues evenly spaced around the wheel.',
    tip: 'Lively and balanced. Keep one hue dominant and mute the other two.',
  },
  {
    id: 'tetradic',
    name: 'Tetradic',
    offsets: [0, 60, 180, 240],
    description: 'Two complementary pairs forming a rectangle.',
    tip: 'Rich and varied. Works best with one clear dominant hue and the rest in smaller areas.',
  },
  {
    id: 'square',
    name: 'Square',
    offsets: [0, 90, 180, 270],
    description: 'Four hues evenly spaced around the wheel.',
    tip: 'Bold and playful. Balance it by varying saturation and value rather than giving each hue equal space.',
  },
];

export const harmonyById = (id: HarmonyId) => HARMONIES.find((h) => h.id === id) ?? HARMONIES[0];

const rotate = (h: number, wheelOffset: number, model: WheelModel) =>
  wheelToHue(hueToWheel(h, model) + wheelOffset, model);

/** Key hues of a harmony for the given base, in OKLCH hue degrees. */
export function harmonyHues(base: Oklch, harmonyId: HarmonyId, model: WheelModel, count: number) {
  const harmony = harmonyById(harmonyId);
  let offsets = harmony.offsets;
  if (harmonyId === 'analogous') {
    // Spread neighbours evenly, wider for bigger palettes, never past 90° each way.
    const n = Math.max(count, 2);
    const step = Math.min(30, Math.max(12, 120 / (n - 1)));
    const baseIndex = Math.floor((n - 1) / 2);
    offsets = Array.from({ length: n }, (_, i) => (i - baseIndex) * step);
  }
  return offsets.map((o) => rotate(base.h, o, model));
}

/**
 * Builds a palette of `count` mid-tones.  Each key hue of the harmony gets a
 * group of colours; extra colours in a group are lighter/darker variations
 * so the palette always has a range of values to paint with.
 */
export function generatePalette(
  base: Oklch,
  count: number,
  harmonyId: HarmonyId,
  model: WheelModel,
): Oklch[] {
  if (harmonyId === 'monochromatic') return monochromatic(base, count);

  const hues = harmonyHues(base, harmonyId, model, count);
  if (harmonyId === 'analogous') {
    const baseIndex = Math.floor((hues.length - 1) / 2);
    return hues.map((h, i) => {
      if (i === baseIndex) return toGamut(base);
      // Neighbours drift a little toward their own natural lightness.
      const l = base.l * 0.75 + cuspLightness(h) * 0.25;
      return toGamut({ l, c: base.c * 0.95, h });
    });
  }

  const keys = hues.slice(0, Math.min(count, hues.length));
  const sizes = keys.map((_, i) => Math.floor(count / keys.length) + (i < count % keys.length ? 1 : 0));
  const colors: Oklch[] = [];

  keys.forEach((h, k) => {
    const anchor: Oklch =
      k === 0
        ? base
        : // Opposite hues take on part of their natural value: yellows lighter, blues darker.
          { l: base.l * 0.65 + cuspLightness(h) * 0.35, c: base.c, h };
    for (let j = 0; j < sizes[k]; j++) {
      if (j === 0) {
        colors.push(toGamut(anchor));
        continue;
      }
      const step = Math.ceil(j / 2) * 0.13;
      const lighter = j % 2 === 1;
      const l = anchor.l + (lighter ? step : -step) * (lighter ? 1 : 1.15);
      colors.push(
        toGamut({
          l: Math.min(0.96, Math.max(0.18, l)),
          c: anchor.c * (lighter ? 0.75 : 0.85),
          h: wrapHue(anchor.h + (lighter ? 6 : -6)),
        }),
      );
    }
  });
  return colors;
}

function monochromatic(base: Oklch, count: number): Oklch[] {
  if (count === 1) return [toGamut(base)];
  const lo = 0.24;
  const hi = 0.94;
  const ls = Array.from({ length: count }, (_, i) => lo + ((hi - lo) * i) / (count - 1));
  // Keep the exact base colour in the palette by snapping the nearest step to it.
  let nearest = 0;
  ls.forEach((l, i) => {
    if (Math.abs(l - base.l) < Math.abs(ls[nearest] - base.l)) nearest = i;
  });
  return ls.map((l, i) => {
    if (i === nearest) return toGamut(base);
    // Saturation falls off toward the very light and very dark ends.
    const falloff = 1 - Math.min(1, Math.abs(l - base.l) * 1.1);
    return toGamut({ l, c: base.c * (0.35 + 0.65 * falloff), h: base.h });
  });
}

// ---------------------------------------------------------------------------
// Light / mid / shadow.  Classic rule of thumb: warm light gives cool shadows
// and cool light gives warm shadows.  Lights shift toward the light's hue and
// lose a little saturation; shadows shift toward the opposite temperature.

export type LightTemp = 'warm' | 'cool';

export interface Ramp {
  light: Oklch;
  mid: Oklch;
  shadow: Oklch;
}

const LIGHT_HUE: Record<LightTemp, { light: number; shadow: number }> = {
  warm: { light: 80, shadow: 275 }, // golden light, blue-violet shadows
  cool: { light: 235, shadow: 45 }, // skylight, warm brown-red shadows
};

function shiftToward(h: number, target: number, amount: number, maxDeg: number) {
  const d = hueDelta(h, target);
  return wrapHue(h + Math.max(-maxDeg, Math.min(maxDeg, d * amount)));
}

export function valueRamp(mid: Oklch, temp: LightTemp): Ramp {
  const { light: lightHue, shadow: shadowHue } = LIGHT_HUE[temp];
  const neutral = mid.c < 0.02;

  const light: Oklch = neutral
    ? { l: mid.l + (1 - mid.l) * 0.55, c: 0.025, h: lightHue }
    : {
        l: mid.l + (0.98 - mid.l) * 0.5,
        c: mid.c * 0.82,
        h: shiftToward(mid.h, lightHue, 0.3, 22),
      };
  const shadow: Oklch = neutral
    ? { l: mid.l * 0.55, c: 0.03, h: shadowHue }
    : {
        l: mid.l * 0.56,
        c: mid.c * 0.88,
        h: shiftToward(mid.h, shadowHue, 0.3, 26),
      };
  return { light: toGamut(light), mid: toGamut(mid), shadow: toGamut(shadow) };
}

/** A pleasant random base colour: mid-to-light value, moderate saturation. */
export function randomBase(): Oklch {
  return toGamut({
    l: 0.5 + Math.random() * 0.3,
    c: 0.07 + Math.random() * 0.11,
    h: Math.random() * 360,
  });
}

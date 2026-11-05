// Colour maths in OKLCH, a perceptual space: equal steps in lightness (L)
// look equal to the eye, which makes value ramps and harmonies behave the
// way a painter expects.  L: 0–1, C: chroma 0–~0.37, H: hue in degrees.

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const wrapHue = (h: number) => ((h % 360) + 360) % 360;

/** Signed shortest angular distance from a to b, in degrees (-180..180]. */
export function hueDelta(a: number, b: number): number {
  const d = wrapHue(b - a);
  return d > 180 ? d - 360 : d;
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const fromLinear = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function oklchToLinearRgb({ l, c, h }: Oklch): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const EPS = 0.0005;
function inGamut(color: Oklch): boolean {
  return oklchToLinearRgb(color).every((v) => v >= -EPS && v <= 1 + EPS);
}

/** Reduce chroma (keeping lightness and hue) until the colour fits in sRGB. */
export function toGamut(color: Oklch): Oklch {
  const l = clamp(color.l, 0, 1);
  const h = wrapHue(color.h);
  let c = Math.max(0, color.c);
  if (inGamut({ l, c, h })) return { l, c, h };
  let lo = 0;
  let hi = c;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut({ l, c: mid, h })) lo = mid;
    else hi = mid;
  }
  c = lo;
  return { l, c, h };
}

export function toHex(color: Oklch): string {
  const rgb = oklchToLinearRgb(toGamut(color));
  return (
    '#' +
    rgb
      .map((v) => Math.round(clamp(fromLinear(clamp(v, 0, 1)), 0, 1) * 255))
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

/** Grey with the same perceived lightness — for value checks. */
export const toGreyHex = (color: Oklch) => toHex({ l: color.l, c: 0, h: 0 });

export function parseHex(input: string): Oklch | null {
  let hex = input.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.replace(/./g, (ch) => ch + ch);
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  const [r, g, b] = [0, 2, 4].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const c = Math.sqrt(A * A + B * B);
  const h = c < 1e-4 ? 0 : wrapHue((Math.atan2(B, A) * 180) / Math.PI);
  return { l: L, c, h };
}

/** Highest chroma sRGB can show for a hue at a given lightness. */
export const maxChroma = (l: number, h: number) => toGamut({ l, c: 0.4, h }).c;

// Lightness at which each hue reaches its strongest colour ("cusp").
// Yellow peaks light, blue peaks dark — used to give harmony hues a natural value.
const cuspTable: number[] = [];
for (let h = 0; h < 360; h += 5) {
  let bestL = 0.6;
  let bestC = 0;
  for (let l = 0.3; l <= 0.97; l += 0.01) {
    const c = maxChroma(l, h);
    if (c > bestC) {
      bestC = c;
      bestL = l;
    }
  }
  cuspTable.push(bestL);
}
export function cuspLightness(h: number): number {
  const x = wrapHue(h) / 5;
  const i = Math.floor(x);
  const t = x - i;
  return cuspTable[i % 72] * (1 - t) + cuspTable[(i + 1) % 72] * t;
}

// ---------------------------------------------------------------------------
// Colour wheels.  Painters traditionally use the RYB wheel (red↔green,
// yellow↔violet, blue↔orange).  "Digital" is the plain perceptual hue circle.
// Wheel angle ⇄ OKLCH hue is a piecewise-linear map through these anchors.

export type WheelModel = 'artist' | 'digital';

const RYB_ANCHORS: [number, number][] = [
  // [wheel angle, OKLCH hue]
  [0, 29], // red
  [60, 58], // orange
  [120, 105], // yellow
  [180, 145], // green
  [240, 258], // blue
  [300, 318], // violet
  [360, 389], // red again
];

function piecewise(x: number, from: 0 | 1): number {
  const to = from === 0 ? 1 : 0;
  // Bring x into the anchors' range on the "from" axis.
  const start = RYB_ANCHORS[0][from];
  const v = start + wrapHue(x - start);
  for (let i = 0; i < RYB_ANCHORS.length - 1; i++) {
    const a = RYB_ANCHORS[i];
    const b = RYB_ANCHORS[i + 1];
    if (v >= a[from] && v <= b[from]) {
      const t = (v - a[from]) / (b[from] - a[from]);
      return wrapHue(a[to] + t * (b[to] - a[to]));
    }
  }
  return wrapHue(v);
}

export const hueToWheel = (h: number, model: WheelModel) =>
  model === 'artist' ? piecewise(h, 1) : wrapHue(h);
export const wheelToHue = (angle: number, model: WheelModel) =>
  model === 'artist' ? piecewise(angle, 0) : wrapHue(angle);

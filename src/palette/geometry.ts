import type { Oklch } from './color';
import type { Ramp } from './harmony';

// Compositions live inside a golden rectangle (W : H = φ : 1).  Every size
// and position comes from φ, so the frame doubles as a reference for placing
// shapes and as a preview of the palette's light, mid and shadow values.

export const PHI = (1 + Math.sqrt(5)) / 2;
export const W = 1000;
export const H = W / PHI; // 618
/** a(n) = W / φⁿ: a(1)=618, a(2)=382, a(3)=236, a(4)=146, a(5)=90, a(6)=56, a(7)=34 … */
export const a = (n: number) => W / PHI ** n;

export type Paint = (c: Oklch) => string;

export interface Roles {
  dominant: Ramp;
  secondary: Ramp;
  tertiary: Ramp;
  accent: Ramp;
  all: Ramp[];
}

/** 60·30·10 style roles: first colour dominates, the last is the accent. */
export function rolesFor(ramps: Ramp[]): Roles {
  const n = ramps.length;
  return {
    dominant: ramps[0],
    secondary: ramps[1 % n],
    tertiary: ramps[(n > 2 ? 2 : 0) % n],
    accent: ramps[n - 1],
    all: ramps,
  };
}

export const guideProps = {
  stroke: '#fff',
  strokeOpacity: 0.75,
  strokeWidth: 2.5,
  strokeDasharray: '10 8',
  fill: 'none',
  style: { mixBlendMode: 'difference' as const },
};

export interface SpiralSquare {
  x: number;
  y: number;
  s: number;
  from: [number, number];
  to: [number, number];
}

/** Squares cut from the golden rectangle clockwise, with the spiral's quarter arcs. */
function spiral() {
  let x = 0;
  let y = 0;
  let w = W;
  let h = H;
  const squares: SpiralSquare[] = [];
  for (let i = 0; i < 9; i++) {
    const dir = i % 4;
    if (dir === 0) {
      const s = h;
      squares.push({ x, y, s, from: [x, y + s], to: [x + s, y] });
      x += s;
      w -= s;
    } else if (dir === 1) {
      const s = w;
      squares.push({ x, y, s, from: [x, y], to: [x + s, y + s] });
      y += s;
      h -= s;
    } else if (dir === 2) {
      const s = h;
      const sx = x + w - s;
      squares.push({ x: sx, y, s, from: [sx + s, y], to: [sx, y + s] });
      w -= s;
    } else {
      const s = w;
      const sy = y + h - s;
      squares.push({ x, y: sy, s, from: [x + s, sy + s], to: [x, sy] });
      h -= s;
    }
  }
  return { squares, eye: [x + w / 2, y + h / 2] as const };
}
export const SPIRAL = spiral();

/** Foot of the perpendicular from (px, py) to the diagonal (0,H)–(W,0). */
export function foot(px: number, py: number) {
  const dx = W;
  const dy = -H;
  const t = (px * dx + (py - H) * dy) / (dx * dx + dy * dy);
  return [t * dx, H + t * dy] as const;
}

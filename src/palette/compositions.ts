import { GoldenSpiral, PhiGrid, Shapes } from './templates';

export const TEMPLATES = [
  {
    name: 'Golden spiral',
    note: 'Areas shrink by φ: the biggest square is your dominant colour, the eye of the spiral holds the accent.',
    Component: GoldenSpiral,
  },
  {
    name: 'Phi grid',
    note: 'Horizon and focal points sit on the φ lines (0.382 / 0.618). The spheres show light, mid and shadow.',
    Component: PhiGrid,
  },
  {
    name: 'Big · medium · small',
    note: 'Shapes scaled by φ, built from light, mid and shadow planes, placed along the golden-triangle diagonals.',
    Component: Shapes,
  },
];

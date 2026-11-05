import { useId } from 'react';
import { H, Paint, W, rolesFor } from './geometry';
import { TEMPLATES } from './compositions';
import type { Ramp } from './harmony';

export default function Composition({
  ramps,
  paint,
  guides,
  index,
  onNext,
}: {
  ramps: Ramp[];
  paint: Paint;
  guides: boolean;
  index: number;
  onNext: () => void;
}) {
  const uid = useId().replace(/:/g, '');
  const { Component, name } = TEMPLATES[index];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="composition"
      role="img"
      aria-label={`${name} composition using the palette`}
      onClick={onNext}
    >
      <Component roles={rolesFor(ramps)} paint={paint} guides={guides} uid={uid} />
    </svg>
  );
}

import { H, PHI, Paint, Roles, SPIRAL, W, a, foot, guideProps } from './geometry';
import type { Ramp } from './harmony';

export interface TemplateProps {
  roles: Roles;
  paint: Paint;
  guides: boolean;
  uid: string;
}

/** A cel-shaded sphere lit from the upper left: shadow, mid, light. */
function Sphere({ cx, cy, r, ramp, paint, id }: { cx: number; cy: number; r: number; ramp: Ramp; paint: Paint; id: string }) {
  return (
    <g>
      <clipPath id={id}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      <circle cx={cx} cy={cy} r={r} fill={paint(ramp.shadow)} />
      <g clipPath={`url(#${id})`}>
        <circle cx={cx - r * 0.22} cy={cy - r * 0.22} r={r * 0.9} fill={paint(ramp.mid)} />
        <circle cx={cx - r * 0.42} cy={cy - r * 0.42} r={r * 0.34} fill={paint(ramp.light)} />
      </g>
    </g>
  );
}

// --- 1. Golden spiral ------------------------------------------------------

export function GoldenSpiral({ roles, paint, guides, uid }: TemplateProps) {
  const { squares, eye } = SPIRAL;
  const n = roles.all.length;
  const path =
    `M${squares[0].from.join(' ')} ` +
    squares.map((q) => `A${q.s} ${q.s} 0 0 1 ${q.to.join(' ')}`).join(' ');
  return (
    <>
      {squares.map((q, i) => (
        <rect key={i} x={q.x} y={q.y} width={q.s} height={q.s} fill={paint(roles.all[i % n].mid)} />
      ))}
      {squares.map((q, i) => (
        <rect key={`e${i}`} x={q.x} y={q.y} width={q.s} height={q.s} fill="none" stroke={paint(roles.dominant.shadow)} strokeWidth={4} />
      ))}
      <path d={path} fill="none" stroke={paint(roles.accent.light)} strokeWidth={7} strokeLinecap="round" />
      <Sphere cx={eye[0]} cy={eye[1]} r={a(7)} ramp={roles.accent} paint={paint} id={`${uid}-eye`} />
      {guides && <path d={path} {...guideProps} />}
    </>
  );
}

// --- 2. Phi grid still life -------------------------------------------------

export function PhiGrid({ roles, paint, guides, uid }: TemplateProps) {
  const upper = H - H / PHI; // upper φ line, 236 from the top
  const horizon = H / PHI; // lower φ line, 382 from the top
  const big = a(4); // 146
  const mid = a(5); // 90
  const small = a(6); // 56
  const spheres = [
    { cx: W / PHI, r: big, ramp: roles.tertiary, contact: horizon + 150 },
    { cx: W - W / PHI - mid * 0.8, r: mid, ramp: roles.accent, contact: horizon + 200 },
    { cx: W / PHI + big + small * 2.2, r: small, ramp: roles.secondary, contact: horizon + 120 },
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint(roles.dominant.light)} />
          <stop offset="1" stopColor={paint(roles.dominant.mid)} />
        </linearGradient>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint(roles.secondary.mid)} />
          <stop offset="1" stopColor={paint(roles.secondary.shadow)} />
        </linearGradient>
      </defs>
      <rect width={W} height={horizon} fill={`url(#${uid}-sky)`} />
      <rect y={horizon} width={W} height={H - horizon} fill={`url(#${uid}-ground)`} />
      {/* The light source sits on a φ point, upper left. */}
      <circle cx={W - W / PHI} cy={upper / PHI} r={a(7)} fill={paint(roles.accent.light)} />
      {spheres.map((s, i) => (
        <ellipse
          key={`sh${i}`}
          cx={s.cx + s.r * 0.55}
          cy={s.contact - s.r * 0.06}
          rx={s.r * 1.05}
          ry={s.r * 0.2}
          fill={paint(roles.secondary.shadow)}
        />
      ))}
      {spheres.map((s, i) => (
        <Sphere key={i} cx={s.cx} cy={s.contact - s.r} r={s.r} ramp={s.ramp} paint={paint} id={`${uid}-s${i}`} />
      ))}
      {guides && (
        <g {...guideProps}>
          <line x1={W - W / PHI} y1={0} x2={W - W / PHI} y2={H} />
          <line x1={W / PHI} y1={0} x2={W / PHI} y2={H} />
          <line x1={0} y1={upper} x2={W} y2={upper} />
          <line x1={0} y1={horizon} x2={W} y2={horizon} />
        </g>
      )}
    </>
  );
}

// --- 3. Big · medium · small shapes ----------------------------------------

export function Shapes({ roles, paint, guides, uid }: TemplateProps) {
  const apex = `${W - W / PHI},${a(6) * 2}`; // peak on the left φ line
  const towerX = W / PHI + a(7);
  const towerTop = H - H / PHI;
  const front = a(5); // 90 — lit face
  const side = a(6); // 56 — shadow face; front : side = φ
  const lift = 22;
  const f1 = foot(0, 0);
  const f2 = foot(W, H);
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint(roles.dominant.light)} />
          <stop offset="0.62" stopColor={paint(roles.dominant.mid)} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}-bg)`} />
      {/* Small: a moon. */}
      <Sphere cx={W - a(6) * 2.4} cy={a(5) * 1.6} r={a(6)} ramp={roles.accent} paint={paint} id={`${uid}-moon`} />
      {/* Big: a mountain in three planes — light, mid, shadow. */}
      <polygon points={`${apex} -140,${H} 140,${H}`} fill={paint(roles.secondary.light)} />
      <polygon points={`${apex} 140,${H} 560,${H}`} fill={paint(roles.secondary.mid)} />
      <polygon points={`${apex} 560,${H} 900,${H}`} fill={paint(roles.secondary.shadow)} />
      {/* Medium: a tower whose faces are in φ proportion. */}
      <polygon
        points={`${towerX},${towerTop} ${towerX + front},${towerTop} ${towerX + front + side},${towerTop - lift} ${towerX + side},${towerTop - lift}`}
        fill={paint(roles.tertiary.mid)}
      />
      <rect x={towerX} y={towerTop} width={front} height={H - towerTop} fill={paint(roles.tertiary.light)} />
      <polygon
        points={`${towerX + front},${towerTop} ${towerX + front + side},${towerTop - lift} ${towerX + front + side},${H} ${towerX + front},${H}`}
        fill={paint(roles.tertiary.shadow)}
      />
      <path
        d={`M0 ${H - a(6)} Q ${W / 2} ${H - a(4)} ${W} ${H - a(6) * 0.6} L${W} ${H} L0 ${H}Z`}
        fill={paint(roles.dominant.shadow)}
      />
      {guides && (
        <g {...guideProps}>
          <line x1={0} y1={H} x2={W} y2={0} />
          <line x1={0} y1={0} x2={f1[0]} y2={f1[1]} />
          <line x1={W} y1={H} x2={f2[0]} y2={f2[1]} />
        </g>
      )}
    </>
  );
}

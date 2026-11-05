# Golden ratio for composition — numbers and constructions

φ = (1 + √5) / 2 ≈ 1.6180339887;  1/φ ≈ 0.618;  1/φ² ≈ 0.382;  φ² = φ + 1.

## The sequence used for sizes
Each step is the previous × 0.618. For a frame 1000 wide (Palette Studio's
`a(n) = W / φⁿ`):

| n | a(n) | typical use |
|---|---|---|
| 0 | 1000 | frame width |
| 1 | 618 | frame height, largest square |
| 2 | 382 | lower φ line; second square |
| 3 | 236 | upper φ line from the top; large shape |
| 4 | 146 | large sphere radius, big shape |
| 5 | 90 | medium shape |
| 6 | 56 | small shape |
| 7 | 34 | accent / light source |
| 8 | 21 | detail |

For whole-number sizes use Fibonacci numbers (…, 13, 21, 34, 55, 89, 144, 233,
377, 610, 987). Ratios of neighbours converge to φ.

## Phi grid
- Vertical lines at 0.382 W and 0.618 W; horizontal lines at 0.382 H and 0.618 H.
- The four intersections are focal-point candidates. Put the horizon on a
  horizontal φ line, never the centre.
- Compared with the rule of thirds, the φ grid pulls the lines closer to the
  centre, so the result is a bit calmer and more classical.

## Golden rectangle and spiral
- Start from a W × W/φ rectangle. Cut a square from one side; the leftover is
  again a golden rectangle. Repeat while rotating the cutting side (left, top,
  right, bottom) to get the nested squares.
- The spiral is a quarter-circle arc in each square, with its radius equal to
  the square's side. It converges to the "eye", near (0.72 W, 0.72 H) when
  the cuts start from the left in the 1000 × 618 frame. Place the focal point
  there.
- Mirror or rotate the spiral to suit the subject's flow (four orientations ×
  mirror = eight placements).
- The squares also give a dominance split: the largest square is the dominant
  colour area and the smallest squares hold the accent.

## Golden triangles (dynamic symmetry)
- Draw a diagonal corner to corner. From each of the other two corners, drop a
  perpendicular onto that diagonal.
- The result is four similar triangles. Align strong edges, limbs and gazes
  with these lines, and put the focal point on the feet of the perpendiculars.
- Foot of the perpendicular from P onto the line A→B:
  `t = ((P−A)·(B−A)) / |B−A|²`, `foot = A + t(B−A)`.

## Big · medium · small
- Pick three main shapes sized a(n), a(n+1), a(n+2). Make them overlap
  unevenly and vary their spacing as well (spacing ratios of φ also work).
- Shape contrast matters too: combine a geometric shape with an organic one,
  and a straight edge with a curve.
- Shade each shape with **planes**: the plane facing the light gets *light*,
  the turning plane gets *mid* and the plane facing away gets *shadow*. This
  shows the palette's value ramp in use.

## Value and colour placement in a φ composition
- Highest value contrast plus the accent colour go at the focal point (φ
  intersection or spiral eye).
- The dominant colour fills the largest area (the biggest square or the
  background). Keep its chroma moderate so the accent can win.
- Distribute the secondary colour in at least two places, so it reads as a
  rhythm rather than a single spot.

## Honest caveats to give users
- φ is a useful *aid* for avoiding static, centred, equal-sized layouts.
- Many claims that famous artworks "follow the golden ratio" are retrofitted
  overlays. Don't repeat them as fact.
- Thirds, the φ grid, dynamic symmetry and the artist's own judgement are
  all valid. Offer φ as one option.

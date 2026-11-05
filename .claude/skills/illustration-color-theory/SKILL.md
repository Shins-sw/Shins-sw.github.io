---
name: illustration-color-theory
description: Painter's colour theory and golden-ratio composition for illustration, plus how they are implemented in this repo's Palette Studio app (src/palette). Use when building, changing or reviewing palette features — harmonies on the RYB wheel, light/mid/shadow value ramps, warm-light/cool-shadow temperature shifts, value checks, dominance (60·30·10), golden-ratio (φ) grids, spirals and shape sizing — or when advising an illustrator on palette and composition choices. Not for UI theme colours or WCAG contrast (that is UI design), and not for photo-collage palette matching (use color-theory-palette-harmony-expert).
---

# Illustration colour theory & golden-ratio composition

Colour advice for **illustrators and painters**, not for UI tokens. Every rule
here is a rule of thumb from painting practice. Present them as guidance the
artist can break on purpose, never as laws.

Two parts:
1. **Principles**: what to tell an artist and what the app should encode.
2. **Implementation in this repo**: where each principle lives in
   `src/palette/`, and how to extend and verify it.

For φ numbers, constructions and composition recipes, read
`references/golden-ratio.md`.

---

## 1. Principles

### 1.1 Value does the work, colour gets the credit
- An image reads from its **value structure** (light ↔ dark) before its hues.
  A palette that fails in greyscale fails in colour.
- Keep big, simple value groups: usually 3 to 5. Light, mid and dark
  masses come first; detail comes later.
- **Value check**: convert to greyscale using *perceptual* lightness (OKLCH L
  or CIELAB L\*), not the RGB average. Yellow and blue at the "same" HSL
  lightness look very different in value.
- Hues of equal chroma differ in natural value. Yellow reaches its strongest
  colour very light (OKLCH L ≈ 0.93), blue much darker
  (L ≈ 0.47) and violet in between (L ≈ 0.55). Respect this: a "dark saturated yellow" turns olive.

### 1.2 Colour wheels: artist RYB vs digital
- Painters use the **RYB wheel**: red ↔ green, yellow ↔ violet,
  blue ↔ orange. Mixing and traditional harmony teaching assume it.
- The digital/perceptual hue circle (RGB, HSL, OKLCH) puts red opposite
  cyan and blue opposite yellow. That is fine for screens, but it is *not* what
  an illustrator means by "complementary".
- Default to RYB for artist-facing harmony. Offer digital as an option.

### 1.3 Harmonies (wheel offsets from the base hue)
| Harmony | Offsets | When to use / how to balance |
|---|---|---|
| Monochromatic | 0 | Calm, unified. Value and shape carry the image, so push the value range. |
| Analogous | −30, 0, +30 (spread wider for more colours, max ±90) | Natural and atmospheric, like sunset. One hue dominates. |
| Complementary | 0, 180 | Maximum vibrancy. One hue dominates and the complement is the accent. Mix the complements for rich neutrals. |
| Split complementary | 0, 150, 210 | Contrast with less tension. Forgiving for beginners. |
| Triadic | 0, 120, 240 | Lively. Keep one dominant and mute the other two. |
| Tetradic (rectangle) | 0, 60, 180, 240 | Rich but hard. Needs a clear dominant hue. |
| Square | 0, 90, 180, 270 | Bold. Balance through saturation and value, not equal areas. |

A harmony gives **key hues**. A usable palette also needs **value and
saturation variation** within each hue, so extra colours should be lighter or
darker variants rather than more hues.

### 1.4 Dominance: 60 · 30 · 10
- Unequal areas read as intentional; equal areas read as chaos.
- Roughly 60 % dominant (often the most muted), 30 % secondary and
  10 % accent (often the most saturated, or the complement). φ areas
  (61.8 / 23.6 / 14.6 …) are a natural alternative split.
- **Saturation is a budget.** Spend high chroma at the focal point. Grey
  everything else down. "Neutral with a splash" (≈85 % muted, 15 % vivid)
  is a strong default.

### 1.5 Light, mid and shadow (form shading)
For each local colour, the lit side, the halftone and the shadow are different
**colours**, not just lighter or darker versions:
- **Light**: higher value. Hue shifts toward the colour of the light, and
  chroma drops slightly near the highlight.
- **Mid (halftone)**: the local colour itself, often at its strongest chroma.
- **Shadow**: lower value. Hue shifts away from the light's temperature, and
  chroma drops slightly. Avoid black or grey mixed into the shadow; it goes
  muddy.
- **Temperature rule**: warm light → cool shadows; cool light (overcast,
  skylight, moonlight) → warm shadows. The shift is relative, not absolute:
  shadows only need to be cooler or warmer *than the lights*.
- Other terms to use when explaining: **core shadow** (darkest part of the
  form shadow), **reflected light** (bounce in the shadow, never as bright as
  the halftone), **cast shadow** (darker and sharper near contact), and
  **occlusion** (darkest point where forms touch).
- Neutrals (greys and whites) take on the light's colour in the light and the
  opposite temperature in shadow.

### 1.6 Atmosphere and depth
- With distance, value contrast drops, chroma drops and hue shifts toward
  the sky or atmosphere colour (usually blue).
- The foreground gets the strongest darks and the highest chroma.

### 1.7 Golden ratio φ ≈ 1.618 in composition
- φ lines divide the frame at **0.382 / 0.618**. They are a softer, less
  central alternative to the rule of thirds (0.333 / 0.667).
- Size shapes by the φ sequence (each ×0.618) for **big · medium · small**
  variety; avoid equal sizes and equal spacing.
- Put the focal point on a φ intersection or the eye of the golden spiral,
  and make it the place with the highest value contrast and the accent colour.
- φ is one composition aid among many. Never claim that it guarantees
  beauty or that masters "always" used it; both claims are contested.
- Details and constructions: `references/golden-ratio.md`.

---

## 2. Implementation in this repo (Palette Studio)

Palette Studio is a PWA served at `/palette/`. Its entry is
`palette/index.html` → `src/palette/main.tsx`. Its build is the second input in
`vite.config.ts`.

| Concern | File | Notes |
|---|---|---|
| Colour maths | `src/palette/color.ts` | OKLCH ⇄ sRGB, `toGamut` (chroma reduction, binary search), `toHex`, `toGreyHex` (value check), `parseHex`, `maxChroma`, `cuspLightness` (natural value per hue) |
| RYB wheel | `color.ts` (`RYB_ANCHORS`, `hueToWheel`, `wheelToHue`) | Piecewise-linear map from wheel angle to OKLCH hue. Harmony offsets are applied in **wheel space**. |
| Harmonies & palette generation | `src/palette/harmony.ts` (`HARMONIES`, `harmonyHues`, `generatePalette`) | Key hues get groups. Extra colours are value variants (±0.13 L, slight hue drift). Non-base hues move 35 % toward their natural cusp lightness. |
| Light / mid / shadow | `harmony.ts` (`valueRamp`, `LIGHT_HUE`) | Warm: light → hue 80, shadow → 275. Cool: light → 235, shadow → 45. Hue shift is 30 % of the distance, capped at 22° (light) and 26° (shadow). |
| φ geometry | `src/palette/geometry.ts` | `PHI`, frame `W×H` = 1000×618, `a(n) = W/φⁿ` (a(1)=618 … a(7)=34), `rolesFor` (dominant, secondary, tertiary, accent), `SPIRAL`, `foot` |
| Composition templates | `src/palette/templates.tsx` + list in `compositions.ts` | Golden spiral, Phi grid, Big · medium · small. Each draws with `paint(color)` so the greyscale value check works. |
| UI | `src/palette/App.tsx`, `ColorWheel.tsx`, `palette.css` | The UI is deliberately neutral grey so it doesn't tint colour perception. Keep it that way. |
| Offline / install | `public/palette/sw.js`, `public/palette/manifest.webmanifest` | Bump `CACHE` in `sw.js` when the caching logic changes. |

### Conventions
- Do all colour maths in **OKLCH**, then gamut-map with `toGamut` before
  output. Never clamp RGB channels to fit; that shifts the hue.
- Anything drawn from palette colours must go through the `paint` prop, never
  `toHex` directly, or the value check breaks.
- Size and place composition shapes with `a(n)` and φ lines, not magic
  numbers. Check the index: **a(3) = 236, a(4) = 146**. This off-by-one
  has happened before.
- Files that export React components must export only components. Put
  constants in `.ts` files, because `react-refresh/only-export-components`
  runs with `--max-warnings 0`.
- The UI language is English. Explain the principle in a short `description`
  plus a practical `tip`, in an artist's vocabulary.

### Recipes
**Add a harmony**: append it to `HARMONIES` in `harmony.ts` (id, name,
offsets in wheel degrees with the base first, description, tip). Add the id to
the `HarmonyId` union. The chips, wheel polygon and Explore section pick it up
automatically.

**Add a composition template**: write a component in `templates.tsx` taking
`TemplateProps` (`roles`, `paint`, `guides`, `uid`). Prefix SVG ids with
`uid`. Use light, mid and shadow from `roles`. Draw φ guides only when
`guides` is set. Then register it with a `name` and a one-sentence `note` in
`compositions.ts`.

**Change shading behaviour**: edit `valueRamp`, then check both temperatures
with a saturated colour, a near-neutral colour (C < 0.02), a very light
yellow and a dark blue.

### Verify
```bash
yarn -s tsc && npx eslint src/palette --ext ts,tsx --max-warnings 0 && yarn -s build
```
- To test the maths quickly, bundle a scratch `.ts` that imports from
  `src/palette/*` with `node_modules/.bin/esbuild --bundle --platform=node`
  and run it with node. Print hex values for each harmony at 2, 5 and 8
  colours.
- To test in a browser, run `vite preview`, then use Playwright with
  `devices['Pixel 7']`. Check for console errors, no horizontal scroll
  (`scrollWidth` = viewport) and that all fills are neutral with the value
  check on. Screenshot each composition template, and reload offline to
  confirm the service worker.
- Sanity-check against painting expectations: in RYB mode, blue's complement
  is orange and red's is green. The base colour always appears in the
  palette. Warm-light shadows sit at a lower L with the hue moved toward
  blue-violet.

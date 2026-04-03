# Colour Palette Redesign — «Акварельный сад»

**Date:** 2026-04-03
**Status:** Approved

## Goal

Replace the current wedding site colour palette with a more harmonious one that:

- Keeps dusty pink and olive green as primary colours
- Makes the pink genuinely "dusty" (muted, warm) instead of bright/saturated
- Adds champagne/honey gold as a third accent
- Evokes a mood between romantic-tender and warm-lively

## CSS Variable Changes

| Variable | Old value | New value | Notes |
|---|---|---|---|
| `--dark-pink` | `#F36787` | `#B8788A` | Smoky rose — the main accent, truly dusty now |
| `--black-pink` | `#f79aaf` | `#D4A8B4` | Soft blush — secondary pink |
| `--dark-green` | `#697c60` | `#607258` | Dark olive — slightly deeper |
| `--light-green` | `#99a982` | `#92A47C` | Light sage — slightly warmer |
| `--gold` | *(new)* | `#BFA06A` | Honey champagne — new third accent |
| `--bg-white` | `#fff4e3` | `#FAF0E2` | Cream background — slightly more neutral |
| `--white` | `#f9f5f0` | unchanged | Warm white |
| `--bg-green` | `#e6e7d9` | unchanged | Light green background |
| `--black` | `#241e19` | unchanged | Warm dark |

## Where Gold Is Used

- **Decorative ornaments** — star dividers (✦) between sections
- **Wedding date** — "24 июня 2026" highlighted in gold
- **Timeline markers** — dot icons in the zigzag day-programme section
- **Hero particles** — replaces current pink particle colour
- **New hover underline rule** — add `a:hover` underline colour using `--gold` (this is a new rule, not a replacement of an existing one)

## What Does Not Change

- Font families (Great Vibes + Jost)
- Layout and structure
- Shadow variables (already reference green hues, remain compatible)
- `--white`, `--bg-green`, `--black`

## Hard-coded Colour Values to Update

Beyond the `:root` variables, these files contain hard-coded old-palette values that must be updated:

| File | Location | Old value | New value | Context |
|---|---|---|---|---|
| `css/styles.css` | line 236 | `rgba(247, 154, 175, 0.06)` | `rgba(184, 120, 138, 0.06)` | `#dress-code::before` radial gradient wash |
| `css/styles.css` | line 306 | `rgba(232, 165, 184, 0.3)` | `rgba(212, 168, 180, 0.3)` | `.dress-code-card` border |
| `css/styles.css` | line 348 | `rgba(232, 165, 184, 0.12)` | `rgba(212, 168, 180, 0.12)` | `.dress-code-avoid` background |
| `css/styles.css` | line 349 | `rgba(232, 165, 184, 0.35)` | `rgba(212, 168, 180, 0.35)` | `.dress-code-avoid` border |
| `js/clock.js` | line 53 | `'#f79aaf'` | `'#D4A8B4'` | Confetti colour array |
| `img/assets/hero_top.svg` | all occurrences | `#f79aaf` / `#F79AAF` | `#D4A8B4` | Path fill colours |
| `img/assets/hero_bottom.svg` | all occurrences | `#f79aaf` / `#F79AAF` | `#D4A8B4` | Path fill colours |

> Note: `rgba(184, 120, 138, ...)` is the RGB decomposition of `#B8788A`. `rgba(212, 168, 180, ...)` is the RGB decomposition of `#D4A8B4`.

## Implementation Scope

1. Update `:root` CSS variables in `css/styles.css`
2. Add `--gold` variable to `:root`
3. Apply `--gold` to the specific elements listed above (ornaments, date, particles, new hover rule)
4. Update all hard-coded colour values as listed in the table above

## Out of Scope

- Changing fonts, layout, animations, or content
- Redesigning any section structure

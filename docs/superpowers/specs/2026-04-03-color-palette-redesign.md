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
- **Hover states** — link underlines on hover
- **Timeline markers** — dot icons in the zigzag day-programme section
- **Hero particles** — replaces current pink particle colour

## What Does Not Change

- Font families (Great Vibes + Jost)
- Layout and structure
- Shadow variables (already reference green hues, remain compatible)
- `--white`, `--bg-green`, `--black`

## Implementation Scope

1. Update `:root` CSS variables in `css/styles.css`
2. Add `--gold` variable
3. Apply `--gold` to the specific elements listed above (ornaments, date, hover states, particles)
4. Update SVG assets if they hard-code the old pink hex value

## Out of Scope

- Changing fonts, layout, animations, or content
- Redesigning any section structure

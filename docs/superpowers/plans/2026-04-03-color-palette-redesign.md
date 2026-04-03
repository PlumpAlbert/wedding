# Colour Palette Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the wedding site colour palette with «Акварельный сад» — a dusty rose + olive + honey gold scheme that is romantic, warm, and harmonious.

**Architecture:** All colour changes live in `css/styles.css` (CSS variables + hard-coded rgba values), `js/animations.js` (particle colours), `js/clock.js` (confetti colours), and two SVG files. Gold is applied to existing elements via new/updated CSS rules; no structural HTML changes.

**Tech Stack:** Vanilla CSS custom properties, vanilla JS, SVG

---

## Files Modified

| File | What changes |
|---|---|
| `css/styles.css` | `:root` variables, 4 hard-coded rgba values, gold application rules |
| `js/animations.js` | Hero particle colours array — add `var(--gold)` |
| `js/clock.js` | Confetti colours array — `#f79aaf` → `#D4A8B4` |
| `img/assets/hero_top.svg` | All `#f79aaf`/`#F79AAF` → `#D4A8B4` |
| `img/assets/hero_bottom.svg` | All `#f79aaf`/`#F79AAF` → `#D4A8B4` |

---

## Task 1: Update CSS `:root` Variables

**Files:**
- Modify: `css/styles.css:13-21`

- [ ] **Step 1: Open `css/styles.css` and update the `:root` block**

  Replace lines 13–21:

  ```css
  /* Color Variables */
  :root {
    --dark-pink: #B8788A;
    --black-pink: #D4A8B4;
    --light-green: #92A47C;
    --dark-green: #607258;
    --gold: #BFA06A;
    --white: #f9f5f0;
    --black: #241e19;
    --bg-white: #FAF0E2;
    --bg-green: #e6e7d9;
  ```

  Old values for reference:
  - `--dark-pink` was `#F36787`
  - `--black-pink` was `#f79aaf`
  - `--light-green` was `#99a982`
  - `--dark-green` was `#697c60`
  - `--bg-white` was `#fff4e3`
  - `--gold` is new

- [ ] **Step 2: Verify in browser**

  Open `index.html` in a browser. The site should immediately reflect softer pinks, deeper olive, and a warmer cream background across all sections.

- [ ] **Step 3: Commit**

  ```bash
  git add css/styles.css
  git commit -m "feat: update :root colour variables to Акварельный сад palette"
  ```

---

## Task 2: Update Hard-coded rgba Values in CSS

**Files:**
- Modify: `css/styles.css:236`, `css/styles.css:306`, `css/styles.css:348-349`

These four rgba values are decompositions of the old pink hex codes and are not covered by the `:root` variables.

- [ ] **Step 1: Update `css/styles.css` line 236 — dress-code wash gradient**

  Find (in `#dress-code::before`):
  ```css
  rgba(247, 154, 175, 0.06),
  ```
  Replace with:
  ```css
  rgba(184, 120, 138, 0.06),
  ```
  _(184, 120, 138 is the RGB decomposition of `#B8788A`)_

- [ ] **Step 2: Update `css/styles.css` line 306 — dress-code card border**

  Find (in `.dress-code-card` or nearby):
  ```css
  border: 1px solid rgba(232, 165, 184, 0.3);
  ```
  Replace with:
  ```css
  border: 1px solid rgba(212, 168, 180, 0.3);
  ```
  _(212, 168, 180 is the RGB decomposition of `#D4A8B4`)_

- [ ] **Step 3: Update `css/styles.css` lines 348–349 — dress-code avoid styles**

  Find (in `.color-palette--sm .color-swatch` or `.dress-code-avoid`):
  ```css
  background: rgba(232, 165, 184, 0.12);
  border: 1px solid rgba(232, 165, 184, 0.35);
  ```
  Replace with:
  ```css
  background: rgba(212, 168, 180, 0.12);
  border: 1px solid rgba(212, 168, 180, 0.35);
  ```

- [ ] **Step 4: Verify**

  Open the dress-code section in browser. The card borders and avoid-colour swatches should use the new blush tone.

- [ ] **Step 5: Commit**

  ```bash
  git add css/styles.css
  git commit -m "feat: update hard-coded rgba pink values in dress-code section"
  ```

---

## Task 3: Apply Gold to Existing Elements

**Files:**
- Modify: `css/styles.css` — add/update rules for date, zigzag dots, section headings, hover

- [ ] **Step 1: Apply gold to date displays**

  There are no standalone section-divider elements in the HTML — ornaments are added via `::after` on section headings (see Step 3). This is intentional.

  Find the existing `#welcome-message p.date` rule (around line 208):
  ```css
  #welcome-message p.date {
    font-size: 2rem;
    opacity: 0.54;
  }
  ```
  Replace with:
  ```css
  #welcome-message p.date {
    font-size: 2rem;
    color: var(--gold);
    opacity: 0.85;
  }
  ```

  Also find `#hero .date, #hero .location` (around line 154) and add gold to just the date:
  ```css
  #hero .date {
    color: var(--gold);
  }
  ```
  Add this rule directly after the `#hero .date, #hero .location` block.

- [ ] **Step 2: Apply gold ring to zigzag dots**

  Find `.zigzag-dot` (around line 615):
  ```css
  .zigzag-dot {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--bg-white);
    border: 2px solid var(--dark-green);
    box-shadow: 0 0 0 4px rgba(105,124,96,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }
  ```
  Replace `box-shadow` line only:
  ```css
  box-shadow: 0 0 0 4px rgba(191,160,106,0.25);
  ```
  _(191,160,106 is the RGB decomposition of `#BFA06A`)_

- [ ] **Step 3: Add gold ✦ ornament to section headings**

  Find the `.handwritten` rule in the CSS and add after it:
  ```css
  .content-section h2.handwritten::after {
    content: " ✦";
    color: var(--gold);
    font-size: 0.6em;
    vertical-align: middle;
    opacity: 0.7;
  }
  ```

- [ ] **Step 4: Add gold hover underline rule**

  Append near the end of the base styles (before media queries):
  ```css
  a:hover {
    text-decoration-color: var(--gold);
  }
  ```

- [ ] **Step 5: Verify**

  In browser: check welcome date is gold, zigzag dots have a faint gold ring, section h2 headings show a small ✦ suffix.

- [ ] **Step 6: Commit**

  ```bash
  git add css/styles.css
  git commit -m "feat: apply --gold to dates, zigzag dots, section headings, hover"
  ```

---

## Task 4: Update Hero Particle Colours in JS

**Files:**
- Modify: `js/animations.js:107-112`

- [ ] **Step 1: Add `--gold` to the hero particle colours array**

  Find (around line 107):
  ```js
  const colors = [
    "var(--dark-green)",
    "var(--black-pink)",
    "var(--light-green)",
    "var(--dark-pink)",
  ];
  ```
  Replace with:
  ```js
  const colors = [
    "var(--dark-green)",
    "var(--black-pink)",
    "var(--light-green)",
    "var(--dark-pink)",
    "var(--gold)",
  ];
  ```

- [ ] **Step 2: Verify**

  Reload `index.html` — a portion of the falling heart particles in the hero section should now appear in the honey gold colour.

- [ ] **Step 3: Commit**

  ```bash
  git add js/animations.js
  git commit -m "feat: add --gold to hero particle colour palette"
  ```

---

## Task 5: Update Confetti Colours in clock.js

**Files:**
- Modify: `js/clock.js:53`

- [ ] **Step 1: Update the confetti colour array**

  Find (line 53):
  ```js
  const colors = ['#f79aaf', '#99a982', '#697c60', '#f9f5f0'];
  ```
  Replace with:
  ```js
  const colors = ['#D4A8B4', '#92A47C', '#607258', '#BFA06A'];
  ```
  Note: warm white (`#f9f5f0`) is intentionally dropped; gold (`#BFA06A`) replaces it.

- [ ] **Step 2: Verify**

  The confetti fires when the countdown reaches zero. To test without waiting: temporarily set the countdown target date in the past, or call the confetti function from the browser console.

- [ ] **Step 3: Commit**

  ```bash
  git add js/clock.js
  git commit -m "feat: update confetti colours to new palette"
  ```

---

## Task 6: Update SVG Assets

**Files:**
- Modify: `img/assets/hero_top.svg`
- Modify: `img/assets/hero_bottom.svg`

Both SVGs use `#f79aaf` / `#F79AAF` for path fills that correspond to `--black-pink`. Replace all with `#D4A8B4`.

- [ ] **Step 1: Update `hero_top.svg`**

  Open `img/assets/hero_top.svg` in a text editor. Run a find-and-replace (case-insensitive) for `#f79aaf` → `#D4A8B4`. Verify no other old palette hex codes remain (check for `#F36787`, `#99a982`, `#697c60` as well).

- [ ] **Step 2: Update `hero_bottom.svg`**

  Same operation on `img/assets/hero_bottom.svg`.

- [ ] **Step 3: Verify**

  Reload `index.html` — the decorative floral SVG overlays at the top and bottom of the hero section should show the new blush tone instead of the old bright pink.

- [ ] **Step 4: Commit**

  ```bash
  git add img/assets/hero_top.svg img/assets/hero_bottom.svg
  git commit -m "feat: update SVG hero decorations to new blush colour #D4A8B4"
  ```

---

## Final Check

- [ ] Open the site in a browser and scroll through every section
- [ ] Confirm no old pink (`#F36787`, `#f79aaf`) is visible anywhere
- [ ] Confirm gold appears on: dates, zigzag dot rings, section heading ornaments, hero particles
- [ ] Check on mobile viewport (375px) — layout must not break

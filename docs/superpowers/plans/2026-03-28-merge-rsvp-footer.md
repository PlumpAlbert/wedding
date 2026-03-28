# Merge RSVP + Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the standalone `#rsvp` section and fold its heading + button into the footer, replacing "Сохраните дату".

**Architecture:** Pure structural edit across three files — HTML restructure, CSS dead-rule removal, JS selector fix. No new components introduced.

**Tech Stack:** Static HTML/CSS, GSAP 3.12 (ScrollTrigger animations)

**Spec:** `docs/superpowers/specs/2026-03-28-merge-rsvp-footer-design.md`

---

## Files

- Modify: `index.html` — remove `#rsvp` section, restructure footer content
- Modify: `css/styles.css` — remove three `#rsvp` rule occurrences
- Modify: `js/animations.js` — delete duplicate `rsvpHeading` fadeUp block

---

### Task 1: Update index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Delete the `#rsvp` section**

Remove lines 194–199 (the entire `<section class="parallax-section" id="rsvp">` block):

```html
    <section class="parallax-section" id="rsvp">
      <div class="content">
        <h2 class="handwritten">Мы будем рады видеть вас!</h2>
        <button class="rsvp-btn">Подтвердить участие</button>
      </div>
    </section>
```

- [ ] **Step 2: Update the footer heading and add the button**

Inside `<footer id="countdown">`, inside `<div class="content">`, replace:

```html
        <h2 class="handwritten">Сохраните дату</h2>
```

with:

```html
        <h2 class="handwritten">Мы будем рады видеть вас!</h2>
        <button class="rsvp-btn">Подтвердить участие</button>
```

The button must sit between the `<h2>` and `<div class="countdown-heart">`.

- [ ] **Step 3: Verify HTML structure in browser (or by reading the file)**

Expected footer `<div class="content">` structure:
```
h2 "Мы будем рады видеть вас!"
button.rsvp-btn
div.countdown-heart
  svg.countdown-heart-shape
  div.countdown-heart-content
    div.countdown
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: merge rsvp section into footer, replace Save the Date heading"
```

---

### Task 2: Clean up CSS

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Remove `#rsvp,` from the mobile sticky-stack selector group (line ~71)**

Find the block starting with `#hero,` that lists sticky-card sections. Remove the `#rsvp,` line from it. `#countdown` stays.

Before (excerpt):
```css
#rsvp,
#countdown {
```

After: `#rsvp,` line deleted. `#countdown {` (or the preceding selector) closes the group.

- [ ] **Step 2: Delete the entire `/* RSVP SECTION */` comment block and `#rsvp { }` rule (lines ~637–648)**

Delete:
```css
/* ========================================
   RSVP SECTION
   ======================================== */

#rsvp {
  background-color: var(--bg-green);
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Leave all `.rsvp-btn` and `.rsvp-ripple` rules untouched — they are class-based and still apply to the button in the footer.

- [ ] **Step 3: Remove `#rsvp,` from the desktop override selector group (line ~754)**

Find the `@media (min-width: 769px)` block that lists sections reverting sticky. Remove `#rsvp,` from that list.

- [ ] **Step 4: Verify no remaining `#rsvp` in CSS**

```bash
grep -n "#rsvp" css/styles.css
```

Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "fix: remove dead #rsvp CSS rules after section merge"
```

---

### Task 3: Fix animation selector

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Delete the `rsvpHeading` block**

Find and delete these two lines (around line 378):

```js
  const rsvpHeading = document.querySelector("#rsvp h2");
  if (rsvpHeading) fadeUp(rsvpHeading);
```

`#countdown h2` is already animated by the existing `countdownHeading` block (`fadeUp(countdownHeading, 0, 30)`). After the merge these target the same DOM node — keeping both would attach two conflicting GSAP ScrollTrigger timelines.

- [ ] **Step 2: Verify no remaining `#rsvp` references in JS**

```bash
grep -n "#rsvp" js/animations.js
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "fix: remove duplicate rsvpHeading fadeUp after section merge"
```

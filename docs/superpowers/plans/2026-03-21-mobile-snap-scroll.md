# Mobile Snap Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile-only (≤ 768px) card-stacking snap scroll — sections look like overlapping cards, GSAP snaps to nearest section after 25% scroll threshold, rapid flipping is throttled.

**Architecture:** Three files change — `index.html` (remove 3 section-divider elements), `css/styles.css` (remove divider rules, add mobile card + snap styles), `js/animations.js` (remove divider animation, add GSAP snap block). No new files. No external dependencies.

**Tech Stack:** Vanilla HTML/CSS, GSAP 3.12.2 (`gsap.matchMedia`, `ScrollTrigger`) — already loaded via CDN.

---

## File Map

| File | Change |
|------|--------|
| `index.html` | Remove lines 60, 150, 197 (section-divider divs) |
| `css/styles.css` | Remove lines 213–234 (`.section-divider` + `.section-divider-line`); append `MOBILE SNAP SCROLL` block |
| `js/animations.js` | Remove lines 306–318 (divider flourish loop); insert `MOBILE SNAP SCROLL` block before line 508 |

---

## Task 1: Remove section-dividers from HTML

**Files:**
- Modify: `index.html:60,150,197`

This project has no automated test runner. Verification is done by opening `index.html` in a browser.

- [ ] **Step 1: Remove the three section-divider elements**

Find and delete each of these three lines:

- Line 60 — between `#welcome-message` and `#details`
- Line 150 — between `#details` and `#dress-code`
- Line 197 — between `#dress-code` and `#gallery`

```html
    <div class="section-divider" aria-hidden="true"><span class="section-divider-line"></span></div>
```

After deletion the file should have no remaining occurrences of `section-divider`.

- [ ] **Step 2: Verify**

Open `index.html` in a browser. Expected: no decorative horizontal lines between sections. No JS errors in console.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: remove section-divider elements"
```

---

## Task 2: Update CSS — remove divider rules, add mobile card styles

**Files:**
- Modify: `css/styles.css:213-234` (remove), append at end of file

- [ ] **Step 1: Remove the `.section-divider` and `.section-divider-line` CSS rules**

Find and delete this entire block (lines 213–234):

```css
.section-divider {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  overflow: hidden;
}

.section-divider-line {
  display: block;
  width: 100%;
  max-width: 120px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--dark-green),
    transparent
  );
  opacity: 0.4;
  transform: scaleX(0);
  transform-origin: center;
}
```

After deletion verify no `.section-divider` selectors remain in the file.

- [ ] **Step 2: Append the mobile snap CSS block at the end of `css/styles.css`**

Add after the last existing rule (after line 760, after the `.reduce-motion *` block):

```css
/* ========================================
   MOBILE SNAP SCROLL (≤ 768px)
   ======================================== */
@media (max-width: 768px) {
  html {
    scroll-behavior: auto;
  }

  /* height: 100dvh on html/body clamps page to one screen,
     which prevents sticky stacking from working. */
  html,
  body {
    height: auto;
  }

  /* Card appearance: each section sticks to top and looks like a card.
     overflow: visible overrides .parallax-section { overflow: hidden },
     which would otherwise prevent position: sticky from working. */
  #hero,
  #welcome-message,
  #details,
  #dress-code,
  #gallery,
  #rsvp,
  #countdown {
    position: sticky;
    top: 0;
    overflow: visible;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.12);
  }

  /* First section — no rounded corners or shadow (nothing below it) */
  #hero {
    border-radius: 0;
    box-shadow: none;
  }

  /* .parallax-section:hover { transform: scale(1.01) } creates a new
     stacking context on touch tap and breaks position: sticky. */
  .parallax-section:hover {
    transform: none;
  }
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Resize browser to < 768px width (or use DevTools device emulation).

Expected:
- Each section (except `#hero`) has rounded top corners and a subtle top shadow
- Sections stack on top of each other as you scroll — the next card slides up and covers the previous
- Desktop (> 768px): layout unchanged, no rounded corners

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add mobile card-stack CSS, remove section-divider rules"
```

---

## Task 3: Update JS — remove divider animation, add GSAP snap block

**Files:**
- Modify: `js/animations.js:306-318` (remove), insert before line 508

- [ ] **Step 1: Remove the section-divider flourish animation block**

Find and delete this entire block (lines 306–318):

```js
  // Section divider flourish (draw-in on scroll)
  document.querySelectorAll(".section-divider-line").forEach((line) => {
    gsap.to(line, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });
```

After deletion verify no `.section-divider-line` references remain in `animations.js`.

- [ ] **Step 2: Insert the GSAP snap block just before `// Debug log` (currently line 508)**

The entire `animations.js` file is wrapped in a `DOMContentLoaded` listener that exits early (`return`) when `prefers-reduced-motion: reduce` is set (lines 4–11). The snap block is inserted inside that same listener, so it is automatically skipped for reduced-motion users — this is intentional, snap scroll is a motion effect.

Insert the following block immediately before the line `// Debug log`:

```js
  // ========== MOBILE SNAP SCROLL ==========
  // gsap.matchMedia scopes the ScrollTrigger to mobile only.
  // ScrollTrigger.matchMedia is deprecated since GSAP 3.11 — use gsap.matchMedia().
  const snapMM = gsap.matchMedia();
  snapMM.add("(max-width: 768px)", () => {
    const SECTIONS = [
      "#hero",
      "#welcome-message",
      "#details",
      "#dress-code",
      "#gallery",
      "#rsvp",
      "#countdown",
    ]
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);

    const THRESHOLD = 0.25; // fraction of viewport height required to advance
    const THROTTLE_MS = 600; // minimum ms between snaps (prevents rapid skipping)
    let lastSnapTime = 0;
    let lastSnapPosition = 0; // stored in px, not as normalised 0-1

    // Called on every snapTo invocation. offsetTop values are stable after
    // ScrollTrigger.refresh() which runs automatically on init.
    // For sections taller than 1.2 × viewport a second snap point is added
    // at the section's bottom, allowing the user to read all content before
    // advancing to the next section.
    function buildSnapPoints() {
      // || 1 guard: maxScroll is used only as a filter bound (not a divisor),
      // so || 1 is harmless and prevents a degenerate 0-filtered points array
      // during any early-init edge case where layout hasn't settled.
      const maxScroll = ScrollTrigger.maxScroll(window) || 1;
      const vh = window.innerHeight;
      const points = [];

      SECTIONS.forEach((section) => {
        const top = section.offsetTop;
        points.push(top);

        if (section.offsetHeight > vh * 1.2) {
          points.push(top + section.offsetHeight - vh);
        }
      });

      return points
        .filter((p) => p >= 0 && p <= maxScroll)
        .sort((a, b) => a - b);
    }

    // trigger + start + end give ScrollTrigger a page-wide scroll range to observe.
    // Without them the snap callback never fires.
    // end is a function so it re-evaluates after ScrollTrigger.refresh().
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      snap: {
        snapTo(value, self) {
          const now = Date.now();
          if (now - lastSnapTime < THROTTLE_MS) {
            // Throttle: return the last snapped position unchanged.
            const max = ScrollTrigger.maxScroll(window) || 1;
            return lastSnapPosition / max;
          }

          const maxScroll = ScrollTrigger.maxScroll(window) || 1;
          const scrollY = value * maxScroll;
          const vh = window.innerHeight;
          const threshold = vh * THRESHOLD;
          const points = buildSnapPoints();
          const direction = self?.direction ?? 1;

          // nearest point AT OR BELOW current scroll position
          const prevPoint = [...points].reverse().find((p) => p <= scrollY + 1);
          // nearest point STRICTLY ABOVE current scroll position
          const nextPoint = points.find((p) => p > scrollY + 1);

          let target;
          if (direction > 0 && nextPoint !== undefined) {
            // Scrolling down: advance only if scrolled > threshold past prevPoint
            target =
              scrollY - (prevPoint ?? 0) >= threshold
                ? nextPoint
                : (prevPoint ?? 0);
          } else if (direction < 0 && prevPoint !== undefined) {
            // Scrolling up: retreat only if scrolled > threshold above nextPoint
            target =
              (nextPoint ?? maxScroll) - scrollY >= threshold
                ? prevPoint
                : (nextPoint ?? maxScroll);
          } else {
            // Default: snap to nearest point
            target = points.reduce((a, b) =>
              Math.abs(b - scrollY) < Math.abs(a - scrollY) ? b : a
            );
          }

          lastSnapTime = now;
          lastSnapPosition = target; // store in px for throttle return
          return target / maxScroll;
        },
        duration: { min: 0.4, max: 0.7 },
        ease: "power2.inOut",
        delay: 0.05,
      },
    });

    // Cleanup called by gsap.matchMedia when viewport exceeds 768px
    return () => {};
  });

```

- [ ] **Step 3: Verify snap behaviour in browser (mobile emulation)**

Open `index.html`. Enable DevTools device emulation (≤ 768px wide).

Expected:
- Scroll down slowly (< 25% of screen height past a section boundary) → page snaps BACK to current section
- Scroll down decisively (≥ 25% past boundary) → page snaps FORWARD to next section
- Same logic works scrolling up
- `#details` (tall section): page scrolls through all 6 zigzag events before snapping to `#dress-code`
- Rapid continued scrolling → only one section advances per 600ms (no skipping multiple sections)
- Open DevTools console: no errors, no deprecation warnings about `ScrollTrigger.matchMedia`

Expected on desktop (> 768px): snap is inactive, page scrolls freely as before.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js
git commit -m "feat: add mobile GSAP snap scroll, remove section-divider animation"
```

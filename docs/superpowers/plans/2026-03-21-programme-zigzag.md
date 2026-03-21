# Programme Zigzag Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 2-event left-aligned timeline in the wedding invitation's «Программа дня» section with a 6-event zigzag timeline featuring alternating left/right cards, emoji dots, and GSAP scroll animations.

**Architecture:** Three files change — `index.html` (markup swap), `css/styles.css` (old `.timeline-*` rules removed, new `.zigzag-*` rules added), `js/animations.js` (old timeline GSAP block replaced with zigzag block). No new files. No external dependencies.

**Tech Stack:** Vanilla HTML/CSS, GSAP 3.12.2 (already loaded via CDN), Google Fonts (Great Vibes + Jost, already loaded).

---

## File Map

| File | Change |
|------|--------|
| `index.html` | Replace `.timeline` block (lines 65–89) with `.zigzag` block containing 6 events |
| `css/styles.css` | Remove all `.timeline-*` rules (lines 425–585); update `#details .container` max-width; add `.zigzag-*` rules |
| `js/animations.js` | Remove `DETAILS (TIMELINE)` block (lines 243–300); add `DETAILS (ZIGZAG)` block |

---

## Task 1: Update HTML markup

**Files:**
- Modify: `index.html:62-91`

- [ ] **Step 1: Replace the timeline block**

Find this block in `index.html`:

```html
<h2 class="handwritten">Программа дня</h2>
<div class="timeline">
  <div class="timeline-line" aria-hidden="true"></div>
  <div class="timeline-item">
    ...
  </div>
  <div class="timeline-item">
    ...
  </div>
</div>
```

Replace `.timeline` and its contents with:

```html
<h2 class="handwritten">Программа дня</h2>
<div class="zigzag">
  <div class="zigzag-line" aria-hidden="true"></div>

  <div class="zigzag-item zigzag-item--left">
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">15:30</span>
        <span class="zz-title">Сбор гостей</span>
      </div>
      <div class="zz-desc">Английская набережная, 28</div>
    </div>
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">🌸</div>
    </div>
  </div>

  <div class="zigzag-item zigzag-item--right">
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">💍</div>
    </div>
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">16:00</span>
        <span class="zz-title">Начало регистрации</span>
      </div>
      <div class="zz-desc">Торжественный зал</div>
    </div>
  </div>

  <div class="zigzag-item zigzag-item--left">
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">16:20</span>
        <span class="zz-title">Фотосессия в ЗАГСе</span>
      </div>
      <div class="zz-desc">На улице</div>
    </div>
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">📸</div>
    </div>
  </div>

  <div class="zigzag-item zigzag-item--right">
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">🚗</div>
    </div>
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">16:40</span>
        <span class="zz-title">Транспортировка</span>
      </div>
      <div class="zz-desc">До места проведения банкета</div>
    </div>
  </div>

  <div class="zigzag-item zigzag-item--left">
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">17:50</span>
        <span class="zz-title">Начало торжества</span>
      </div>
      <div class="zz-desc">Английская набережная, 28</div>
    </div>
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">🥂</div>
    </div>
  </div>

  <div class="zigzag-item zigzag-item--right">
    <div class="zigzag-dot-wrap" aria-hidden="true">
      <div class="zigzag-dot">✨</div>
    </div>
    <div class="zigzag-content">
      <div class="zz-header">
        <span class="zz-time">22:00</span>
        <span class="zz-title">Окончание вечера</span>
      </div>
      <div class="zz-desc">Спасибо, что были с нами</div>
    </div>
  </div>

</div>
```

- [ ] **Step 2: Verify in browser**

Open `index.html` in a browser. Scroll to «Программа дня». Expected: unstyled list of 6 events visible (no layout yet — CSS comes next). No JS errors in console.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace timeline markup with 6-event zigzag structure"
```

---

## Task 2: Update CSS — remove old rules, add zigzag rules

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Update `#details .container` max-width**

Find in `css/styles.css`:
```css
#details .container {
  max-width: 640px;
}
```
Change to:
```css
#details .container {
  max-width: 860px;
}
```

- [ ] **Step 2: Remove old timeline rules**

Delete the entire block from the comment `/* ========================================` before `DETAILS SECTION (TIMELINE)` through the closing `@media (max-width: 768px)` block that contains `.timeline-*` rules.

Concretely, find and delete everything from:
```css
/* ========================================
   DETAILS SECTION (TIMELINE)
   ======================================== */
```
…down to and including the closing `}` of the `@media (max-width: 768px)` block that contains `.timeline-dot`, `.timeline-content`, `.timeline-header`, `.timeline-time`.

After deletion, verify none of these selectors remain anywhere in the file: `.timeline`, `.timeline-line`, `.timeline-item`, `.timeline-dot`, `.timeline-content`, `.timeline-header`, `.timeline-time`, `.timeline-separator`, `.timeline-title`, `.timeline-description`.

- [ ] **Step 3: Add zigzag CSS rules**

In place of the deleted block, add:

```css
/* ========================================
   DETAILS SECTION (ZIGZAG TIMELINE)
   ======================================== */

.zigzag {
  position: relative;
  margin: 2rem auto 0;
}

/* Центральная линия.
   Центрируется через left + margin-left, а не transform,
   чтобы GSAP мог владеть transform для scaleY-анимации. */
.zigzag-line {
  position: absolute;
  left: 50%;
  margin-left: -1px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--dark-green) 8%,
    var(--dark-green) 92%,
    transparent 100%
  );
  opacity: 0.3;
  transform-origin: top;
  transform: scaleY(0);
}

.zigzag-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}
.zigzag-item:last-child { margin-bottom: 0; }

.zigzag-item--left  { flex-direction: row; }
.zigzag-item--right { flex-direction: row-reverse; }

.zigzag-content {
  width: calc(50% - 2rem);
  padding: 1.1rem 1.2rem;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(255,255,255,0.95), rgba(249,245,240,0.98));
  border: 1px solid rgba(105,124,96,0.12);
  box-shadow: 0 4px 20px rgba(105,124,96,0.08), 0 1px 3px rgba(0,0,0,0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.zigzag-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(105,124,96,0.12);
}

.zigzag-item--left  .zigzag-content { margin-right: 4rem; text-align: right; }
.zigzag-item--right .zigzag-content { margin-left:  4rem; text-align: left; }

.zz-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}
.zigzag-item--left  .zz-header { justify-content: flex-end; }
.zigzag-item--right .zz-header { justify-content: flex-start; }

.zz-time {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--bg-white);
  background: var(--dark-green);
  padding: 0.3rem 0.65rem;
  border-radius: 100px;
  flex-shrink: 0;
}

.zz-title {
  font-family: var(--header-font);
  font-size: 1.5rem;
  color: var(--dark-green);
  line-height: 1.2;
}

.zz-desc {
  font-size: 0.9rem;
  color: var(--black);
  opacity: 0.75;
  line-height: 1.5;
}

.zigzag-dot-wrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

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

/* Мобайл: схлопывается в однострочный левый layout */
@media (max-width: 768px) {
  #details .container { max-width: 100%; }

  /* left = половина ширины dot (42px / 2 = 21px) от левого края .zigzag */
  .zigzag-line {
    left: 21px;
    margin-left: 0;
  }

  .zigzag-item,
  .zigzag-item--left,
  .zigzag-item--right { flex-direction: row; }

  .zigzag-dot-wrap {
    position: static;
    transform: none;
    flex-shrink: 0;
  }

  /* DOM-порядок --left: [content, dot-wrap].
     После перехода в static-flow dot оказывается справа.
     order: -1 ставит dot первым в flex. */
  .zigzag-item--left .zigzag-dot-wrap { order: -1; }

  .zigzag-content,
  .zigzag-item--left  .zigzag-content,
  .zigzag-item--right .zigzag-content {
    width: auto;
    flex: 1;
    margin-left: 1rem;
    margin-right: 0;
    text-align: left;
  }

  .zigzag-item--left  .zz-header,
  .zigzag-item--right .zz-header { justify-content: flex-start; }
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Scroll to «Программа дня». Expected:
- Desktop (> 768px): 6 cards alternating left/right, emoji dots centered on a vertical line, time pills green, titles in cursive.
- Mobile (≤ 768px): all cards in a single left-aligned column, dot on the left, card to the right.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: add zigzag timeline CSS, remove old timeline rules"
```

---

## Task 3: Update GSAP animations

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Remove old timeline animation block**

Find and delete this entire block in `animations.js` (starts around line 243):

```js
// ========== DETAILS (TIMELINE) ==========
```

…through the closing `});` of the `timelineItems.forEach(...)` call. The block ends just before `// Section divider flourish`.

After deletion, confirm none of these variables/selectors remain in the deleted region: `detailsHeading`, `timeline`, `timelineLine`, `timelineItems`, `.timeline`, `.timeline-line`, `.timeline-item`, `.timeline-dot`, `.timeline-content`.

- [ ] **Step 2: Add zigzag animation block**

In the same location (just before `// Section divider flourish`), add:

```js
// ========== DETAILS (ZIGZAG) ==========
const zigzagHeading = document.querySelector('#details h2');
if (zigzagHeading) fadeUp(zigzagHeading);

const zigzagLine = document.querySelector('.zigzag-line');
if (zigzagLine) {
  // Line is centered via left + margin-left (not transform),
  // so GSAP can safely own transform for scaleY animation.
  gsap.to(zigzagLine, {
    scaleY: 1,
    duration: 1.4,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.zigzag',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

document.querySelectorAll('.zigzag-item').forEach((item) => {
  const dot     = item.querySelector('.zigzag-dot');
  const content = item.querySelector('.zigzag-content');
  const isLeft  = item.classList.contains('zigzag-item--left');

  if (dot) {
    gsap.fromTo(dot,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  if (content) {
    // --left card slides in from the right (x: 30 → 0)
    // --right card slides in from the left (x: -30 → 0)
    gsap.fromTo(content,
      { x: isLeft ? 30 : -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
});
```

- [ ] **Step 3: Verify animations in browser**

Open `index.html`. Scroll down to «Программа дня» slowly. Expected:
- Vertical line draws downward as you enter the section
- Each dot pops in (scale 0 → 1) as its row enters view
- Each card slides in from the correct side (left cards from right, right cards from left)
- Scrolling back up reverses all animations

Open DevTools console — no JS errors.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js
git commit -m "feat: add zigzag GSAP animations, remove old timeline animations"
```

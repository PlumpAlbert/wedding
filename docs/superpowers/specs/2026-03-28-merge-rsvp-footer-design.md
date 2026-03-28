# Design: Merge RSVP and Footer sections

**Date:** 2026-03-28

## Goal

Remove the standalone `#rsvp` section and fold its content into `<footer id="countdown">`, replacing the heading "Сохраните дату" with the RSVP heading and adding the RSVP button above the countdown widget.

## Layout (top → bottom inside footer)

1. `<h2 class="handwritten">Мы будем рады видеть вас!</h2>`
2. `<button class="rsvp-btn">Подтвердить участие</button>`
3. Countdown heart widget (unchanged)
4. Copyright block (unchanged)

## Changes

### index.html

- Delete `<section class="parallax-section" id="rsvp">…</section>` entirely.
- Inside `<footer id="countdown">`, inside `<div class="content">`:
  - Replace `<h2 class="handwritten">Сохраните дату</h2>` with `<h2 class="handwritten">Мы будем рады видеть вас!</h2>`
  - Insert `<button class="rsvp-btn">Подтвердить участие</button>` immediately after the `<h2>`, before `<div class="countdown-heart">`.

### css/styles.css

Three locations where `#rsvp` appears — specific action for each:

1. **Line 71 — sticky card stack selector group** (`#hero, … #rsvp, #countdown { position: sticky; … }`): remove `#rsvp,` from the list. `#countdown` is already in the group.

2. **Lines 638–648 — `/* RSVP SECTION */` block with `#rsvp { background-color: var(--bg-green); … }`**: delete the entire comment header and `#rsvp { }` rule. `#countdown` has its own layout rules and inherits background from `.parallax-section`; the RSVP green background is not needed.

3. **Line 754 — desktop override selector group** (`#hero, … #rsvp, #countdown { position: relative; … }`): remove `#rsvp,` from the list.

`.rsvp-btn` and all other `.rsvp-*` rules are class-based — leave them untouched.

### js/animations.js

- **Delete** the `rsvpHeading` block entirely (lines 378–379):
  ```js
  const rsvpHeading = document.querySelector("#rsvp h2");
  if (rsvpHeading) fadeUp(rsvpHeading);
  ```
  `#countdown h2` is already animated via `countdownHeading` (line 215: `fadeUp(countdownHeading, 0, 30)`). After the merge these are the same element — keeping both would register two conflicting GSAP timelines on the same node.

- `.rsvp-btn` selectors in the magnetic hover, ripple, heartbeat, and entrance animation blocks remain unchanged (class-based, still resolves after the move).

## Out of scope

- Styling changes to the footer beyond removing dead `#rsvp` rules.
- Any new animations.

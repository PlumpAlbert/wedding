# Dress Code Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить скучную секцию «Дресс-код» (6 кружков без подписей) на редакционный блок с карточками «Она / Он», бейджем дресс-кода, палитрой цветов и блоком «Что избегать».

**Architecture:** Правки в трёх файлах: `index.html` (новая разметка), `css/styles.css` (новые селекторы + desktop override), `js/animations.js` (убрать конфликтующую глобальную анимацию свотчей, добавить ScrollTrigger для новых элементов). Два SVG-файла-placeholder кладутся в `img/dress-code/` — они заменяются на реальные фото одним изменением `src`.

**Tech Stack:** Vanilla HTML/CSS, GSAP 3.12.2 + ScrollTrigger. Нет сборщика, нет npm. Статика.

**Spec:** `docs/superpowers/specs/2026-03-28-dress-code-design.md`

---

## Карта файлов

| Файл | Действие | Что меняется |
|---|---|---|
| `img/dress-code/woman.svg` | Создать | SVG-placeholder женского образа |
| `img/dress-code/man.svg` | Создать | SVG-placeholder мужского образа |
| `index.html:150-189` | Изменить | Заменить содержимое `#dress-code .container` |
| `css/styles.css:252-265` | Изменить | Удалить `.dress-code-content`, `#dress-code p`, `#dress-code strong` |
| `css/styles.css:267-285` | Изменить | Добавить новые селекторы в секцию DRESS CODE |
| `css/styles.css:694-697` | Изменить | Добавить desktop override рядом с `#details .container` |
| `js/animations.js:319-346` | Изменить | Заменить блок DRESS CODE: убрать глобальный `.color-swatch`, добавить новые триггеры |

---

## Task 1: SVG-иконки-placeholders

**Files:**
- Create: `img/dress-code/woman.svg`
- Create: `img/dress-code/man.svg`

- [ ] **Step 1: Создать директорию и woman.svg**

```bash
mkdir -p img/dress-code
```

Создать файл `img/dress-code/woman.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="13" r="8" fill="#e8a5b8"/>
  <path d="M20 26 Q16 38 10 58 H54 Q48 38 44 26 Q38 31 32 31 Q26 31 20 26Z" fill="#f2d0dc"/>
  <path d="M20 26 Q22 22 32 22 Q42 22 44 26" fill="none" stroke="#e8a5b8" stroke-width="2" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 2: Создать man.svg**

Создать файл `img/dress-code/man.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="13" r="8" fill="#b8c9a8"/>
  <path d="M18 28 L14 58 H50 L46 28 L40 34 L32 30 L24 34 Z" fill="#8a9b6c"/>
  <path d="M26 28 L32 30 L38 28 L36 46 L32 50 L28 46 Z" fill="#f8c6d0"/>
  <path d="M26 28 L18 28 L24 34" fill="none" stroke="#6b7a4f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38 28 L46 28 L40 34" fill="none" stroke="#6b7a4f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 3: Проверить в браузере**

Открыть `img/dress-code/woman.svg` и `img/dress-code/man.svg` напрямую в браузере — должны отрисоваться цветные силуэты.

- [ ] **Step 4: Commit**

```bash
git add img/dress-code/
git commit -m "feat: add outfit SVG placeholder icons for dress-code section"
```

---

## Task 2: Обновить HTML-разметку секции

**Files:**
- Modify: `index.html:150-189`

- [ ] **Step 1: Заменить содержимое `#dress-code .container`**

В `index.html` найти блок `<div class="container">` внутри `<section ... id="dress-code">` (строки 149–190) и заменить его содержимое целиком:

```html
    <section class="content-section" id="dress-code">
      <div class="container">
        <h2 class="handwritten">Дресс-код</h2>
        <div class="dress-code-badge">Smart Casual</div>
        <p class="dress-code-intro">
          Чтобы этот день был красивым, просим выбрать наряд в наших цветах
        </p>
        <div class="dress-code-cards">

          <div class="dress-code-card dress-code-card--woman">
            <img class="outfit-icon" src="img/dress-code/woman.svg" alt="Женский образ">
            <div class="outfit-label">Она</div>
            <div class="outfit-desc">Лёгкое платье или юбка миди</div>
            <div class="color-palette color-palette--sm">
              <div class="color-swatch" style="background-color: #f8c6d0" title="Нежно-розовый"></div>
              <div class="color-swatch" style="background-color: #e8a5b8" title="Пыльная роза"></div>
              <div class="color-swatch" style="background-color: #f2d0dc" title="Бледно-розовый"></div>
              <div class="color-swatch" style="background-color: #8a9b6c" title="Оливковый"></div>
              <div class="color-swatch" style="background-color: #b8c9a8" title="Шалфейный"></div>
              <div class="color-swatch" style="background-color: #6b7a4f" title="Тёмный оливковый"></div>
            </div>
          </div>

          <div class="dress-code-card dress-code-card--man">
            <img class="outfit-icon" src="img/dress-code/man.svg" alt="Мужской образ">
            <div class="outfit-label">Он</div>
            <div class="outfit-desc">Костюм или рубашка с брюками</div>
            <div class="color-palette color-palette--sm">
              <div class="color-swatch" style="background-color: #f8c6d0" title="Нежно-розовый"></div>
              <div class="color-swatch" style="background-color: #e8a5b8" title="Пыльная роза"></div>
              <div class="color-swatch" style="background-color: #f2d0dc" title="Бледно-розовый"></div>
              <div class="color-swatch" style="background-color: #8a9b6c" title="Оливковый"></div>
              <div class="color-swatch" style="background-color: #b8c9a8" title="Шалфейный"></div>
              <div class="color-swatch" style="background-color: #6b7a4f" title="Тёмный оливковый"></div>
            </div>
          </div>

        </div>
        <div class="dress-code-avoid">
          <span class="dress-code-avoid__label">Просим избегать</span>
          <span class="dress-code-avoid__list">Белого · Чёрного · Ярких принтов</span>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Открыть в браузере, убедиться что структура появилась**

Секция должна отображаться: заголовок, текст «Smart Casual», текст-intro, две иконки с подписями, кружки палитры. Стилей ещё нет — выглядит без оформления, это нормально.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace dress-code section markup with cards layout"
```

---

## Task 3: CSS — мобильные стили

**Files:**
- Modify: `css/styles.css:252-285`

- [ ] **Step 1: Удалить устаревшие правила**

В `css/styles.css` найти и **удалить** следующие правила (строки 252–265):

```css
#dress-code .dress-code-content {
  max-width: 100%;
  margin: 0 auto;
  font-size: 1.1rem;
  text-align: center;
}

#dress-code p {
  margin-bottom: 1.2rem;
}

#dress-code strong {
  color: var(--dark-green);
}
```

- [ ] **Step 2: Добавить новые селекторы**

После правила `.color-swatch { ... }` (строка ~285) добавить блок новых стилей:

```css
/* Dress Code — новые компоненты */
.dress-code-badge {
  display: inline-block;
  border: 1.5px solid var(--dark-pink);
  color: var(--dark-pink);
  padding: 5px 18px;
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: var(--base-font);
  margin-bottom: 1rem;
}

.dress-code-intro {
  text-align: center;
  font-size: 0.95rem;
  color: var(--black-pink);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-family: var(--base-font);
}

.dress-code-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.dress-code-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 14px;
  text-align: center;
  box-shadow: var(--shadow-light);
  border: 1px solid rgba(232, 165, 184, 0.3);
}

.outfit-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  display: block;
  margin: 0 auto 10px;
  background-color: var(--bg-white);
  border-radius: 50%;
  padding: 8px;
}

.outfit-label {
  font-family: var(--base-font);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--black);
  margin-bottom: 4px;
}

.outfit-desc {
  font-family: var(--base-font);
  font-size: 0.8rem;
  color: var(--black-pink);
  margin-bottom: 12px;
  line-height: 1.4;
}

.color-palette--sm {
  gap: 5px;
  margin-top: 0;
  margin-bottom: 0;
}

.color-palette--sm .color-swatch {
  width: 18px;
  height: 18px;
}

.dress-code-avoid {
  background: rgba(232, 165, 184, 0.12);
  border: 1px solid rgba(232, 165, 184, 0.35);
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
}

.dress-code-avoid__label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--dark-pink);
  margin-bottom: 6px;
  font-family: var(--base-font);
}

.dress-code-avoid__list {
  font-size: 0.85rem;
  color: var(--black-pink);
  font-family: var(--base-font);
}
```

- [ ] **Step 3: Проверить мобильный вид в браузере (DevTools, 375px)**

Должно отображаться: заголовок → бейдж-пилюля → вводный текст → две карточки вертикально (стопкой) → блок «Что избегать». Иконки в круглом фоне, мелкие свотчи в карточке.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add dress-code cards CSS (mobile-first base styles)"
```

---

## Task 4: CSS — desktop override

**Files:**
- Modify: `css/styles.css` (внутри `@media (min-width: 769px)`, рядом со строкой 695)

- [ ] **Step 1: Добавить desktop override**

В блок `@media (min-width: 769px)`, рядом с правилом `#details .container` (строка ~695), добавить:

```css
  /* ---- Dress code: two-column desktop layout ---- */
  #dress-code .container {
    max-width: 760px;
  }

  .dress-code-cards {
    grid-template-columns: 1fr 1fr;
  }
```

- [ ] **Step 2: Проверить desktop вид в браузере (ширина >769px)**

Карточки должны встать в две колонки рядом. `.container` должен быть не шире 760px и отцентрирован.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add dress-code two-column desktop layout override"
```

---

## Task 5: JS — обновить GSAP-анимации

**Files:**
- Modify: `js/animations.js:318-346`

- [ ] **Step 1: Убедиться что `.color-swatch` используется только в dress-code**

```bash
grep -n "color-swatch" index.html
```

Ожидаемый вывод: все строки находятся внутри `<section ... id="dress-code">`. Если `color-swatch` встречается в других секциях — **не удалять** глобальный `querySelectorAll(".color-swatch")` в animations.js, а сузить его до `#dress-code .color-swatch`. Если только в dress-code — продолжать по плану.

- [ ] **Step 2: Заменить блок DRESS CODE в animations.js**

В `animations.js` найти секцию `// ========== DRESS CODE ==========` (строки 318–346) и заменить её целиком:

```js
  // ========== DRESS CODE ==========
  const dressCodeHeading = document.querySelector("#dress-code h2");
  if (dressCodeHeading) fadeUp(dressCodeHeading);

  const dressCodeBadge = document.querySelector(".dress-code-badge");
  if (dressCodeBadge) fadeUp(dressCodeBadge, 0.1);

  const dressCodeIntro = document.querySelector(".dress-code-intro");
  if (dressCodeIntro) fadeUp(dressCodeIntro, 0.15);

  // Cards: stagger fadeUp
  const cardWoman = document.querySelector(".dress-code-card--woman");
  const cardMan   = document.querySelector(".dress-code-card--man");
  if (cardWoman && cardMan) {
    gsap.fromTo(
      [cardWoman, cardMan],
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardWoman.parentElement,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Color swatches inside cards: pop-in stagger
  const cardSwatches = document.querySelectorAll(".dress-code-cards .color-swatch");
  cardSwatches.forEach((swatch, i) => {
    gsap.fromTo(
      swatch,
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        delay: i * 0.04,
        ease: "elastic.out(1.2, 0.5)",
        scrollTrigger: {
          trigger: swatch.closest(".dress-code-card"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const dressCodeAvoid = document.querySelector(".dress-code-avoid");
  if (dressCodeAvoid) fadeUp(dressCodeAvoid, 0.2);
```

- [ ] **Step 3: Проверить в браузере — прокрутить до секции**

При скролле до `#dress-code`:
- Заголовок и бейдж плавно поднимаются
- Вводный текст появляется с небольшой задержкой
- Карточки влетают с разницей ~0.15с
- Маленькие свотчи появляются каскадом
- Блок «Что избегать» появляется последним

- [ ] **Step 4: Проверить `prefers-reduced-motion`**

В DevTools → Rendering → «Emulate CSS media feature prefers-reduced-motion: reduce».
Перезагрузить страницу — секция должна отображаться без анимаций (весь JS-блок не запускается из-за ранней проверки в строке 8).

- [ ] **Step 5: Commit**

```bash
git add js/animations.js
git commit -m "feat: add GSAP scroll animations for dress-code cards and swatches"
```

---

## Task 6: Финальная проверка

- [ ] **Step 1: Проверить мобильный вид (375px)**

В DevTools на 375px:
- Карточки в одну колонку
- Иконки, подписи, палитра, «Что избегать» — всё видно
- Секция участвует в snap-scroll (свайп вниз/вверх — страница доезжает до секции)

- [ ] **Step 2: Проверить desktop (>769px)**

На широком экране:
- Карточки в две колонки
- `max-width: 760px` и центрирование

- [ ] **Step 3: Убедиться что `id="dress-code"` не изменился**

```bash
grep 'id="dress-code"' index.html
```

Вывод должен содержать ровно одну строку — секция не переименована.

- [ ] **Step 4: Финальный commit (если всё ок)**

```bash
git add -A
git status  # убедиться что не осталось несохранённых изменений
git log --oneline -5  # убедиться что все 4 предыдущих коммита на месте
```

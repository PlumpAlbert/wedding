# Дизайн: Секция «Программа дня» — Зигзаг-тайм-лайн

**Дата:** 2026-03-21
**Статус:** Approved

---

## Обзор

Полная замена секции `#details` («Программа дня») в свадебном электронном приглашении. Текущая реализация — левосторонний тайм-лайн с двумя событиями. Новая реализация — центрированный зигзаг-тайм-лайн с шестью событиями, эмодзи-иконками и короткими описаниями.

---

## События программы

| Время | Название | Emoji | Описание |
|-------|----------|-------|----------|
| 15:30 | Сбор гостей | 🌸 | — |
| 16:00 | Начало регистрации | 💍 | — |
| 16:20 | Фотосессия в ЗАГСе | 📸 | — |
| 16:40 | Транспортировка | 🚗 | — |
| 17:50 | Начало торжества | 🥂 | — |
| 22:00 | Окончание вечера | ✨ | — |

> Текстовые описания подставляются в HTML-разметку вручную. При желании поле `.zz-desc` удаляется без последствий для остальной вёрстки.

---

## HTML (`index.html`)

Заменить существующий блок `.timeline` внутри `#details .container` на структуру `.zigzag`.

**Важно:** `.zigzag-line` размещается как первый дочерний элемент `.zigzag`, но чередование сторон управляется явными CSS-классами (`.zigzag-item--left`, `.zigzag-item--right`), а не `nth-child`, — поэтому порядок DOM-детей не влияет на результат.

Нечётные события (1, 3, 5) → класс `zigzag-item--left` (карточка слева, dot по центру).
Чётные события (2, 4, 6) → класс `zigzag-item--right` (карточка справа, dot по центру).

```html
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

---

## CSS (`css/styles.css`)

### Удалить
Все правила с селекторами: `.timeline`, `.timeline-line`, `.timeline-item`, `.timeline-dot`, `.timeline-content`, `.timeline-header`, `.timeline-time`, `.timeline-separator`, `.timeline-title`, `.timeline-description` и связанные `@media (max-width: 768px)`.

### Изменить
`#details .container` — увеличить `max-width` с `640px` до `860px`, чтобы карточки зигзага не были слишком узкими.

### Добавить

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
  top: 0; bottom: 0;
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

/* Карточка слева — контент занимает левую половину, dot по центру */
.zigzag-item--left  { flex-direction: row; }
/* Карточка справа — dot по центру, контент занимает правую половину */
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
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--bg-white);
  border: 2px solid var(--dark-green);
  box-shadow: 0 0 0 4px rgba(105,124,96,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
}

/* Мобайл: схлопывается в однострочный левый layout */
@media (max-width: 768px) {
  #details .container { max-width: 100%; }

  /* Линия прижимается влево.
     .zigzag-line позиционируется относительно .zigzag (после padding контейнера).
     left: 21px = половина ширины dot (42px / 2) — центр dot от левого края .zigzag. */
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

  /* Для --left элементов DOM-порядок: content → dot-wrap.
     После перехода dot-wrap в static-flow dot оказывается справа.
     Исправляем через order: -1 — dot встаёт первым в flex. */
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

---

## JS (`js/animations.js`)

### Удалить
Блок `// ========== DETAILS (TIMELINE) ==========` целиком.

### Добавить

```js
// ========== DETAILS (ZIGZAG) ==========
const zigzagHeading = document.querySelector('#details h2');
if (zigzagHeading) fadeUp(zigzagHeading);

const zigzagLine = document.querySelector('.zigzag-line');
if (zigzagLine) {
  // Линия центрирована через left + margin-left (не transform),
  // поэтому GSAP может безопасно владеть transform для scaleY.
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
        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }

  if (content) {
    // Карточка слева (--left) слайдится справа налево (x: 30 → 0).
    // Карточка справа (--right) слайдится слева направо (x: -30 → 0).
    gsap.fromTo(content,
      { x: isLeft ? 30 : -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }
});
```

---

## Что НЕ меняется

- Структура и id секции `#details`
- Заголовок `<h2 class="handwritten">Программа дня</h2>`
- Анимации всех остальных секций
- Цветовые переменные CSS

---

## Критерии готовности

- [ ] 6 событий отображаются в зигзаг-layout на десктопе (чередование left/right)
- [ ] На мобайле (≤ 768px) layout однострочный, dot слева, карточка справа
- [ ] Линия рисуется при скролле (GSAP scaleY), центрирование не ломается
- [ ] Dot появляется с pop-in, карточки слайдятся с нужной стороны
- [ ] Старые `.timeline-*` стили и JS-блок удалены
- [ ] `#details .container` max-width обновлён до 860px

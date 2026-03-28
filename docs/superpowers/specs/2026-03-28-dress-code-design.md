# Дресс-код — редизайн секции

**Дата:** 2026-03-28
**Статус:** Approved

---

## Контекст

Текущая секция `#dress-code` содержит один абзац текста и шесть цветных кружков без подписей. Задача — полный рестайл с добавлением контента.

---

## Цели

- Визуально богатая секция в стиле wedding editorial
- Разделение по образам (Она / Он) с иконками-placeholders
- Все цвета палитры видны внутри каждой карточки
- Блок «Что избегать»
- Бейдж уровня дресс-кода
- Иконки легко заменяются на реальные фото одним изменением `src`
- Анимация через существующие GSAP ScrollTrigger паттерны

---

## Структура HTML

Заменить содержимое `#dress-code .container` полностью. Обёртка `.dress-code-content` убирается — её CSS-правило тоже удалить.

```html
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
        <!-- те же 6 .color-swatch -->
      </div>
    </div>
    <div class="dress-code-card dress-code-card--man">
      <img class="outfit-icon" src="img/dress-code/man.svg" alt="Мужской образ">
      <div class="outfit-label">Он</div>
      <div class="outfit-desc">Костюм или рубашка с брюками</div>
      <div class="color-palette color-palette--sm">
        <!-- те же 6 .color-swatch -->
      </div>
    </div>
  </div>
  <div class="dress-code-avoid">
    <span class="dress-code-avoid__label">Просим избегать</span>
    <span class="dress-code-avoid__list">Белого · Чёрного · Ярких принтов</span>
  </div>
</div>
```

---

## Как заменить иконки

1. Положить файл в `img/dress-code/woman.svg` (или `.png`, `.jpg`, `.webp`)
2. В `index.html` найти `<img class="outfit-icon" src="img/dress-code/woman.svg">`
3. Изменить `src` — больше ничего не нужно

Аналогично для `man.svg`. Пока реальных изображений нет, используем Lucide SVG.

---

## Стили CSS

### Обновления в секции `DRESS CODE SECTION` (`css/styles.css`)

**Удалить** устаревшее правило `#dress-code .dress-code-content` (заменяется новыми селекторами).

**Мобильная база (без медиа-запроса):**

| Селектор | Описание |
|---|---|
| `.dress-code-badge` | `display: inline-block; border: 1.5px solid var(--dark-pink); color: var(--dark-pink); padding: 5px 18px; border-radius: 20px; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; font-family: var(--base-font)` |
| `.dress-code-intro` | `text-align: center; font-size: 0.95rem; color: var(--black-pink); margin-bottom: 1.5rem; line-height: 1.6` |
| `.dress-code-cards` | Мобильная база: `display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 16px` (одна колонка) |
| `.dress-code-card` | `background: #fff; border-radius: 16px; padding: 20px 14px; text-align: center; box-shadow: var(--shadow-light); border: 1px solid rgba(232, 165, 184, 0.3)` |
| `.outfit-icon` | `width: 64px; height: 64px; object-fit: contain; display: block; margin: 0 auto 10px; background-color: var(--bg-white); border-radius: 50%; padding: 8px` — точка замены |
| `.outfit-label` | `font-family: var(--base-font); font-weight: 600; font-size: 0.9rem; color: var(--black); margin-bottom: 4px` |
| `.outfit-desc` | `font-family: var(--base-font); font-size: 0.8rem; color: var(--black-pink); margin-bottom: 12px; line-height: 1.4` |
| `.color-palette--sm .color-swatch` | `width: 18px; height: 18px` — компактный вариант внутри карточек |
| `.dress-code-avoid` | `background: rgba(232, 165, 184, 0.12); border: 1px solid rgba(232, 165, 184, 0.35); border-radius: 12px; padding: 12px 16px; text-align: center` |
| `.dress-code-avoid__label` | `display: block; font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--dark-pink); margin-bottom: 6px; font-family: var(--base-font)` |
| `.dress-code-avoid__list` | `font-size: 0.85rem; color: var(--black-pink); font-family: var(--base-font)` |

**Десктопный override** (внутри существующего блока `@media (min-width: 769px)` рядом с другими desktop-правилами):

```css
#dress-code .container { max-width: 760px; }
.dress-code-cards { grid-template-columns: 1fr 1fr; }
```

---

## Анимация GSAP

Добавить внутри существующего `DOMContentLoaded`-колбека в `animations.js`, **после** блока `prefersReducedMotion` guard (не создавать новый listener). Если `prefersReducedMotion` вернул `true` — блок не выполняется автоматически, дополнительных проверок не нужно.

**Существующий конфликт:** текущий код в `animations.js` уже анимирует `.color-swatch` глобально. Перед добавлением новой анимации нужно сузить существующий селектор — вместо `.color-swatch` использовать `#dress-code .dress-code-content .color-swatch` (старый одиночный блок). Новые свотчи в карточках получают свою анимацию отдельно.

| Элемент | Эффект | Реализация |
|---|---|---|
| `h2` + `.dress-code-badge` | `fadeUp` | вызов существующего `fadeUp()` |
| `.dress-code-intro` | `fadeUp` | вызов `fadeUp()` |
| `.dress-code-card--woman` и `.dress-code-card--man` | stagger fadeUp | `staggerGroup([cardWoman, cardMan], ...)` с delay 0.1s между ними |
| `.color-swatch` внутри `.dress-code-cards` | stagger pop-in | после карточки, `stagger: 0.04s`, scoped на `.dress-code-cards .color-swatch` |
| `.dress-code-avoid` | `fadeUp` | вызов `fadeUp()`, задержка после карточек |

Все триггеры: `start: "top 85%"`, `toggleActions: "play none none reverse"` — в соответствии с существующим паттерном `fadeUp`.

---

## Файлы, которые затрагивает реализация

| Файл | Изменение |
|---|---|
| `index.html` | Заменить содержимое `#dress-code .container` |
| `css/styles.css` | Удалить `.dress-code-content`, добавить новые селекторы; desktop override в media-блоке |
| `js/animations.js` | Сузить существующий `.color-swatch`-селектор; добавить новые ScrollTrigger-блоки |
| `img/dress-code/` | Создать директорию |
| `img/dress-code/woman.svg` | Новый файл — Lucide placeholder (заменяется позже) |
| `img/dress-code/man.svg` | Новый файл — Lucide placeholder (заменяется позже) |

---

## Что НЕ меняется

- `id="dress-code"` — сохраняется (используется в snap-scroll массиве `SECTIONS`)
- `position: sticky` логика секции
- `.color-swatch` базовые стили (только добавляется модификатор `--sm`)
- Остальные секции не затрагиваются

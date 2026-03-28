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

```
#dress-code .container
  h2.handwritten "Дресс-код"
  .dress-code-badge         ← "Smart Casual" (бейдж-пилюля)
  p.dress-code-intro        ← вводный текст
  .dress-code-cards         ← grid 1fr 1fr
    .dress-code-card.dress-code-card--woman
      img.outfit-icon[src="img/dress-code/woman.svg"]
      .outfit-label          ← "Она"
      .outfit-desc           ← "Лёгкое платье или юбка миди"
      .color-palette         ← те же 6 кружков (переиспользуем .color-swatch)
    .dress-code-card.dress-code-card--man
      img.outfit-icon[src="img/dress-code/man.svg"]
      .outfit-label          ← "Он"
      .outfit-desc           ← "Костюм или рубашка с брюками"
      .color-palette         ← те же 6 кружков
  .dress-code-avoid          ← "Просим избегать · Белого · Чёрного · Ярких принтов"
```

---

## Как заменить иконки

1. Положить файл в `img/dress-code/woman.svg` (или `.png`, `.jpg`, `.webp`)
2. В `index.html` найти `<img class="outfit-icon" src="img/dress-code/woman.svg">`
3. Изменить `src` — больше ничего не нужно

Аналогично для `man.svg`.

---

## Стили CSS

### Новые селекторы в `css/styles.css` (добавляются в секцию `DRESS CODE`)

| Селектор | Описание |
|---|---|
| `.dress-code-badge` | Бейдж-пилюля: border + цвет `--dark-pink`, uppercase, letter-spacing |
| `.dress-code-intro` | Вводный абзац, text-align: center |
| `.dress-code-cards` | `display: grid; grid-template-columns: 1fr 1fr; gap: 12px` |
| `.dress-code-card` | Белая карточка, border-radius 16px, тень, border `--dark-pink` 10% opacity |
| `.outfit-icon` | `width: 64px; height: 64px; object-fit: contain` — точка замены |
| `.outfit-label` | Имя (`Она` / `Он`), Jost 600 |
| `.outfit-desc` | Описание образа, Jost 0.8rem, цвет приглушённый |
| `.dress-code-avoid` | Блок «Что избегать»: розовый фон, border, centered |

Существующий `.color-palette` и `.color-swatch` переиспользуются внутри карточек без изменений (уменьшить размер свотча до 18px через модификатор `.color-palette--sm`).

---

## Анимация GSAP

Подключается к существующим паттернам `fadeUp` / `staggerGroup` в `js/animations.js`.

| Элемент | Эффект | Задержка |
|---|---|---|
| `h2` + `.dress-code-badge` | `fadeUp` | 0s |
| `.dress-code-intro` | `fadeUp` | 0.1s |
| `.dress-code-card--woman` | `fadeUp` | 0.15s |
| `.dress-code-card--man` | `fadeUp` | 0.25s |
| `.color-swatch` внутри карточек | `stagger` 0.04s | после карточки |
| `.dress-code-avoid` | `fadeUp` | 0.35s |

Все триггеры через `ScrollTrigger` с `start: "top 80%"`, `once: true`.
`prefers-reduced-motion`: если задан класс `reduce-motion` — анимации пропускаются (существующая логика).

---

## Файлы, которые затрагивает реализация

| Файл | Изменение |
|---|---|
| `index.html` | Заменить содержимое `#dress-code .container` |
| `css/styles.css` | Обновить секцию `DRESS CODE SECTION` |
| `js/animations.js` | Добавить ScrollTrigger для новых элементов |
| `img/dress-code/woman.svg` | Новый файл (Lucide placeholder) |
| `img/dress-code/man.svg` | Новый файл (Lucide placeholder) |

---

## Что НЕ меняется

- `id="dress-code"` — сохраняется (используется в snap-scroll массиве `SECTIONS`)
- `position: sticky` логика секции
- `.color-swatch` базовые стили
- Остальные секции не затрагиваются

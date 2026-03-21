# Дизайн: Мобильный снэп-скролл — «стопка карточек»

**Дата:** 2026-03-21
**Статус:** Approved

---

## Обзор

Только на мобайле (≤ 768px): секции страницы приобретают вид карточек со скруглёнными верхними углами и тенью. При прокрутке следующая карточка выезжает снизу и накрывает предыдущую. GSAP ScrollTrigger автоматически доснэпывает к ближайшей секции, если пользователь прокрутил более 25% высоты экрана за границу секции — иначе возвращает назад. Троттл 600ms предотвращает пролёт через несколько секций.

Декоративные разделители между секциями (`section-divider`) удаляются полностью — из HTML, CSS и JS.

---

## Что меняется

| Файл | Изменение |
|------|-----------|
| `index.html` | Удалить 3 `<div class="section-divider">` (строки 60, 150, 197) |
| `css/styles.css` | Удалить блок `.section-divider` / `.section-divider-line`; добавить мобильные стили карточек |
| `js/animations.js` | Удалить блок `Section divider flourish`; добавить блок `MOBILE SNAP SCROLL` |

---

## Что НЕ меняется

- Десктопный layout и все существующие GSAP-анимации
- Структура и порядок секций
- `scroll-behavior: smooth` на десктопе (только на мобайле переопределяется)

**Примечание — параллакс на мобайле:** Секции `#hero`, `#rsvp`, `#countdown` используют `background-attachment: fixed` для параллакс-эффекта. На мобайле iOS/Android `background-attachment: fixed` работает ненадёжно и отключается браузером самостоятельно — его потеря при добавлении `position: sticky` не является деградацией дизайна.

**Примечание — `prefers-reduced-motion`:** `animations.js` завершает работу досрочно при `prefers-reduced-motion: reduce` — snap-скролл в таком случае тоже не активируется. Это намеренное поведение: snap-скролл является motion-эффектом.

---

## Детали: удаление section-divider

### HTML (`index.html`)

Удалить три строки:
```html
<div class="section-divider" aria-hidden="true"><span class="section-divider-line"></span></div>
```
Встречаются на строках 60, 150, 197 (между `#hero`/`#welcome-message`, `#details`/`#dress-code`, `#dress-code`/`#gallery`).

### CSS (`css/styles.css`)

Удалить полностью:
```css
.section-divider { … }
.section-divider-line { … }
```

### JS (`js/animations.js`)

Удалить блок `// Section divider flourish (draw-in on scroll)` — цикл `document.querySelectorAll(".section-divider-line").forEach(…)`.

---

## Детали: мобильные стили карточек

Добавить в `css/styles.css` новый блок `MOBILE SNAP` в конце файла (после всех остальных правил):

```css
/* ========================================
   MOBILE SNAP SCROLL (≤ 768px)
   ======================================== */
@media (max-width: 768px) {
  html {
    scroll-behavior: auto;
  }

  /* Карточечный вид: каждая секция прилипает к верху и выглядит как карточка.
     overflow: visible переопределяет .parallax-section { overflow: hidden },
     которое иначе предотвращало бы работу position: sticky. */
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

  /* Первая секция — без скруглений и тени (снизу ничего нет) */
  #hero {
    border-radius: 0;
    box-shadow: none;
  }
}
```

**Почему z-index не нужен:** секции расположены в DOM последовательно, браузер рисует их в том же порядке — каждая следующая карточка автоматически оказывается поверх предыдущей без явного z-index.

**`overflow: visible` для параллакс-секций:** `.parallax-section` имеет `overflow: hidden` в существующем CSS. `position: sticky` внутри элемента с `overflow: hidden` не работает — sticky-элемент ведёт себя как `position: relative`. Переопределение `overflow: visible` на мобайле исправляет это. Потеря клиппинга на мобайле незначительна, так как `background-attachment: fixed` уже не работает на мобильных браузерах.

---

## Детали: GSAP snap-логика

Использовать `gsap.matchMedia()` (API GSAP 3.11+, актуальный для используемой версии 3.12.2). `ScrollTrigger.matchMedia` устарел с 3.11 и выводит предупреждение в консоль.

Добавить в `js/animations.js` новый блок сразу перед строкой `// Debug log`:

```js
// ========== MOBILE SNAP SCROLL ==========
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

  const THRESHOLD = 0.25; // 25% dvh до следующего снэпа
  const THROTTLE_MS = 600;
  let lastSnapTime = 0;
  let lastSnapPosition = 0; // px, не timestamp

  // buildSnapPoints вызывается при каждом snapTo.
  // offsetTop корректен после ScrollTrigger.refresh() (происходит при инициализации).
  // Для секций выше 1.2 × dvh добавляется вторая точка — «дно» секции,
  // позволяющая прокрутить до последнего контента перед переходом к следующей.
  function buildSnapPoints() {
    const maxScroll = ScrollTrigger.maxScroll(window);
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

  ScrollTrigger.create({
    snap: {
      snapTo(value, self) {
        const now = Date.now();
        // Троттл: если с последнего снэпа прошло < THROTTLE_MS,
        // возвращаем ту же позицию (в нормализованном виде 0–1).
        if (now - lastSnapTime < THROTTLE_MS) {
          return lastSnapPosition / ScrollTrigger.maxScroll(window);
        }

        const maxScroll = ScrollTrigger.maxScroll(window);
        const scrollY = value * maxScroll;
        const vh = window.innerHeight;
        const threshold = vh * THRESHOLD;
        const points = buildSnapPoints();
        const direction = self?.direction ?? 1;

        // Ближайшая точка НИЖЕ текущей позиции
        const nextPoint = points.find((p) => p > scrollY + 1);
        // Ближайшая точка ВЫШЕ или равная текущей
        const prevPoint = [...points].reverse().find((p) => p <= scrollY + 1);

        let target;
        if (direction > 0 && nextPoint !== undefined) {
          // Скролл вниз: снэпаем вперёд если прокрутили > threshold за prevPoint
          target =
            scrollY - (prevPoint ?? 0) >= threshold ? nextPoint : (prevPoint ?? 0);
        } else if (direction < 0 && prevPoint !== undefined) {
          // Скролл вверх: снэпаем назад если прокрутили > threshold выше nextPoint
          target =
            (nextPoint ?? maxScroll) - scrollY >= threshold
              ? prevPoint
              : (nextPoint ?? maxScroll);
        } else {
          // Ближайшая точка по умолчанию
          target = points.reduce((a, b) =>
            Math.abs(b - scrollY) < Math.abs(a - scrollY) ? b : a
          );
        }

        lastSnapTime = now;
        lastSnapPosition = target; // сохраняем px-позицию
        return target / maxScroll;
      },
      duration: { min: 0.4, max: 0.7 },
      ease: "power2.inOut",
      delay: 0.05,
    },
  });

  // Cleanup при выходе из media query (gsap.matchMedia возвращает cleanup-функцию)
  return () => {};
});
```

---

## Критерии готовности

- [ ] На мобайле (≤ 768px) секции выглядят как карточки со скруглёнными верхними углами
- [ ] Прокрутка < 25% высоты экрана → снэп обратно к текущей секции
- [ ] Прокрутка ≥ 25% → снэп к следующей/предыдущей секции
- [ ] Быстрый непрерывный скролл не пролетает через несколько секций (троттл 600ms)
- [ ] Секция `#details` (высокая) прокручивается внутри перед переходом к следующей
- [ ] `section-divider` полностью удалены из HTML, CSS и JS
- [ ] На десктопе ничего не изменилось
- [ ] В консоли нет предупреждений о `ScrollTrigger.matchMedia`

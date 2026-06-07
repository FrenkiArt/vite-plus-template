# Проект — Текущее состояние

## Система заголовков (custom-variables.scss)

| Элемент   | Размер         | Weight | line-height | letter-spacing |
| --------- | -------------- | ------ | ----------- | -------------- |
| `h1, .h1` | 3.5rem (56px)  | 300    | 1.143       | -0.045em       |
| `h2, .h2` | 2.5rem (40px)  | 500    | 1.2         | -0.035em       |
| `h3, .h3` | 2rem (32px)    | 600    | 1.25        | -0.01em        |
| `h4, .h4` | 1.5rem (24px)  | 700    | 1.333       | normal         |
| `h5, .h5` | 1.25rem (20px) | 700    | 1.2         | normal         |
| `h6, .h6` | 1rem (16px)    | 700    | 1.5         | normal         |
| `.lead`   | 1.25rem (20px) | 300    | 1.2         | —              |

## Вертикальный ритм

- Шаг базовой сетки: **8px**
- `$paragraph-margin-bottom: 1.5rem`
- Заголовки и `.lead`: `margin-bottom: 1.5rem`
- `:last-child` сбрасывает отступ у `p, .lead, li, figure, blockquote, .blockquote, .blockquote-footer`

## text-box

Все текстовые элементы получают `text-box: trim-both ex alphabetic` в `@supports`. Chrome 133+, Safari 18.2+, Edge 133+.

## Кнопки и инпуты

- `$input-btn-padding-y: 0.5rem`
- `$btn-padding-y: calc($input-btn-padding-y + 0.478rem)` — компенсация text-box
- Оба компонента одной высоты (~48px)

## Prose (prose.scss)

- Контейнер `.prose` для статейного контента
- `> * + * { margin-block-start: 1lh }`
- `.attach-next` / `.attach-prev` — для изображений, привязанных к соседнему контенту
- Списки: `ul, ol { padding-left: 1.3em }`, `.tight` класс для уменьшенных отступов
- `initTightLists(".prose")` в `my.js`

## Scroll-анимации (GSAP + ScrollTrigger)

- 7 эффектов: fade, slide-up, slide-left, slide-right, zoom, blur, clip-up
- Микс через `data-scroll="slide-up zoom"` (space-separated)
- Easing: `cubic-bezier(0,0,0.5,1)`
- Blur и clip-up — через proxy-объект с `onUpdate`
- `will-change` в `animation.scss`, начальные CSS-состояния

## Smart sticky header

- `position: sticky`, `transition: transform` с `cubic-bezier(0,0,0.5,1)`
- `.sticky-hidden` (translateY(-100%)), `.sticky-shadow`
- `--header-height` на `html` для anchor offset
- `sticky-smart.js` — подписка на `lenis.on("scroll")`
- `will-change: transform` **удалён** (ломает position:fixed у дочерних offcanvas)

## Offcanvas

- Bootstrap `offcanvas-start`, внутри хедера
- Ширина: `$offcanvas-horizontal-width: 30ch` + `max-width: 89%`
- При открытии → `lenis.stop()`, при закрытии → `lenis.start()`
- Анкорные ссылки (`a[href^="#"]`): `offcanvas.hide()` → `lenis.scrollTo(href, { userData: { isAnchor: true } })` на `hidden.bs.offcanvas`
- `lenis.start()` перед `hide()` для стабильного RAF
- `data-bs-dismiss` убран с `<a>`, импорт `Offcanvas` как default

## Меню (site.json → menu2)

- `"hidden": true` — скрыть пункт
- `"class": "d-lg-none"` — кастомный класс на `<a>`
- Текущая страница: `<span class="nav-link active" aria-current="page">` вместо ссылки

## Навигация

- `src/pages/*.njk` — `{% set pageUrl = "/..." %}` для каждой страницы
- `aria-current="page"` — только при совпадении `item.url == pageUrl`

## Импорты Bootstrap JS

- `import "bootstrap/js/dist/modal"` (side-effect, data-api)
- `import Offcanvas from "bootstrap/js/dist/offcanvas"` (default, `Offcanvas.getInstance()`)
- `import ScrollSpy from "bootstrap/js/dist/scrollspy"` (default, manual `new ScrollSpy()`)
- **Не** использовать `import { Modal, ScrollSpy, Offcanvas } from 'bootstrap'` — баррель тянет весь Bootstrap JS (нет `sideEffects: false` в package.json Bootstrap'а)
- Subpath-импорты: Vite вытряхивает неиспользуемое, только Modal + Offcanvas + ScrollSpy + shared deps

## Lenis

- `autoRaf: true`, `anchors: { userData: { isAnchor: true } }`
- `lenis.on("scroll", ScrollTrigger.update)`
- Без кастомного wrapper (весь body)

## Horizontal scroll + drag scroll

- `enableHorizontalScroll('.invisible-scrollbar-friendly, .invisible-scrollbar')` — wheel + Lenis совместимость
- Проверка `scrollWidth <= clientWidth` — не блокировать page scroll если нет horizontal overflow
- `e.stopPropagation()` — Lenis не перехватывает wheel на этом элементе
- `e.preventDefault()` + `behavior: 'smooth'` — плавный скролл
- `enableDragScroll` — drag-to-scroll с классом `.dragging`
- `.dragging` в HTML не ставить — `enableDragScroll` сам управляет

## Wrap-slider-nav (WIP)

- Новый враппер `.wrap-slider-nav` вокруг `<ul>` в оффканвасе
- `overflow-auto invisible-scrollbar` на `<ul>` — горизонтальный скролл nav-меню
- Селекторы для `enableHorizontalScroll` / `enableDragScroll` нужно расширить на `.invisible-scrollbar`

## Полезные команды

| Команда    | Описание               |
| ---------- | ---------------------- |
| `vp dev`   | Сервер разработки      |
| `vp build` | Сборка продакшена      |
| `vp lint`  | Линтинг (oxlint)       |
| `vp fmt`   | Форматирование (oxfmt) |

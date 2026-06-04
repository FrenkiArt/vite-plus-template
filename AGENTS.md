# Проект — Текущее состояние типографики

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
- `$paragraph-margin-bottom: 1.5rem` (24px на десктопе = 3 ед.)
- Все заголовки и `.lead`: `margin-bottom: 1.5rem`
- `:last-child` сбрасывает нижний отступ у: `p, .lead, li, figure, blockquote, .blockquote, .blockquote-footer`

## text-box (экспериментально)

Все текстовые элементы получают `text-box` только в браузерах с поддержкой (обёрнуто в `@supports`):

```scss
@supports (text-box: trim-both) {
  h1–h6,
  .h1–.h6,
  .fs-1–6,
  .display-1–6,
  p,
  .lead,
  blockquote,
  .blockquote,
  figcaption,
  .figure-caption,
  li,
  dt,
  dd,
  th,
  td,
  pre,
  code,
  address,
  small,
  label,
  legend,
  button,
  .btn {
    text-box: trim-both ex alphabetic;
  }
}
```

Поддержка: Chrome 133+ (отлично), Safari 18.2+ (отлично, включая `ex`), Edge 133+ (отлично), Firefox — пока нет, но при появлении включится автоматом.

## Кнопки и инпуты

- `$input-btn-padding-y: 0.5rem`
- `$btn-padding-y: calc($input-btn-padding-y + 0.48rem)` — компенсация `text-box` для равенства высоты с инпутами (~48px)
- Оба компонента должны быть одной высоты благодаря увеличенному padding кнопок.

## breadcrumb

- Файл: `breadcrumb.scss`
- `float: none` на `.breadcrumb-item + .breadcrumb-item::before` (переопределён Bootstrap float)

## display-классы

- Отключены: `$display-font-sizes: ()` (пустая карта)
- Если включишь — `text-box` на них уже есть в глобальной группе

## Prose — редакционная типографика (`prose.scss`)

Изолированный контейнер `.prose` для статейного контента. Отличается от основной сетки:

- Сбрасывает Bootstrap-отступы внутри, строит ритм заново через `> * + * { margin-block-start: 1lh }`
- Все маржины — в `lh` (line-height элемента), кратно 8px через дроби
- Весь код в `.prose { }` для изоляции от глобальных стилей

### attach-логика

Классы для изображений, привязанных к соседнему контенту:

| Класс         | Где         | Что делает                                       |
|---------------|-------------|--------------------------------------------------|
| `.attach-next` | На `<img>`  | Сбрасывает `margin-bottom: 0`, следующий заголовок получает уменьшенный отступ (`0.5lh–0.67lh` в зависимости от размера) |
| `.attach-prev`  | На `<img>`  | Идёт после текста, получает уменьшенный верхний отступ (`0.33lh–1lh` в зависимости от предыдущего элемента) |

### Первое изображение + заголовок

`> img:first-of-type + h1…h6` — автоматически уменьшенный margin-top на заголовке, если статья начинается с картинки.

### Lead после заголовков

Per-heading отступы для `.lead`, стоящего сразу после `h1–h6`:

| Селектор        | Main       | Fallback |
|-----------------|------------|----------|
| `h1, h2 + .lead` | `1lh` (24px, 3 шага) | `0.33lh` |
| `h3–h6 + .lead`  | `0.67lh` (16px, 2 шага) | `0.33lh` |

### Figure глобально (`typograf.scss`)

```scss
figure { margin-bottom: 1.5rem; }
@supports not (text-box: trim-both) { margin-bottom: 1rem; }
```

### Списки

- Глобально и в `.prose`: `ul, ol { padding-left: 1.3em }`
- `li + li` — `1lh` (с `text-box`) / `0.33lh` (без)
- Исключены из `li + li`: `.breadcrumb-item`, `.list-group-item`, `.nav__item`, а также любые `li` с атрибутом `class` (через `:not([class])`)
- Класс `.tight` на `<ul>`/`<ol>` — уменьшенный отступ между айтемами (`0.66lh` / `0.17lh` fallback)
- `initTightLists(".prose")` в `my.js` — авто-добавление `.tight` если все `li` однострочные (запускается после `document.fonts.ready`)

### Шрифты

- Inter через Google Fonts (Fira Code удалён)
- `base.njk` — единственное место подключения

## Полезные команды

| Команда    | Описание               |
| ---------- | ---------------------- |
| `vp dev`   | Сервер разработки      |
| `vp build` | Сборка продакшена      |
| `vp lint`  | Линтинг (oxlint)       |
| `vp fmt`   | Форматирование (oxfmt) |

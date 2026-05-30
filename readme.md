# Vite Plus Template

**Актуальная версия:** 3.0.0 (май 2026)

> Быстрый старт для вёрстки сайтов на **Vite + Vituum + Nunjucks** с форматированием через **oxlint/oxfmt**.  
> Сборка осуществляется через **vite-plus** — Vite-обёртка с предустановленными оптимизациями и плагинами.  
> Шаблонизатор выбран из-за схожести с Fenom (MODX Revolution) для лёгкого переноса в CMS.

---

## 🇷🇺 Описание на русском

## Возможности

- ⚡ Мгновенная разработка — HMR для Nunjucks, SCSS и JavaScript
- 📁 Компонентный подход — переиспользуемые блоки (header, footer, карточки и т.д.)
- 📄 Многостраничность — каждая страница в `src/pages` → отдельный HTML
- 🌐 Глобальные данные — JSON-файлы автоматически доступны в шаблонах
- 🧩 Близко к MODX — структура layouts/components/pages напоминает чанки и шаблоны
- 🎨 SCSS + автопрефиксы
- 🖼 SVG-спрайт — автоматическая сборка всех иконок
- 🔧 oxlint/oxfmt — быстрый линтинг и форматирование
- 📦 Продакшн-сборка — минификация, оптимизация ассетов

---

## Установка и запуск

### 1. Клонирование

git clone https://github.com/FrenkiArt/vite-template.git your-project
cd your-project

### 2. Установка зависимостей

npm install

### 3. Запуск сервера разработки

npx vp dev

После запуска откроется браузер с главной страницей. Все изменения применяются мгновенно.

### 4. Сборка для продакшена

npx vp build

Готовые файлы появятся в `dist/`.

---

## Структура проекта

vite-template/
├── public/
├── src/
│ ├── assets/
│ │ ├── styles/
│ │ │ ├── main.scss
│ │ │ ├── custom-bootstrap.scss
│ │ │ ├── custom-variables.scss
│ │ │ └── ...
│ │ └── js/
│ │   ├── main.js
│ │   └── my.js
│ ├── components/
│ │ ├── header.njk
│ │ ├── footer.njk
│ │ └── ...
│ ├── data/
│ │ ├── site.json
│ │ └── menu.json
│ ├── icons/
│ │ ├── geo.svg
│ │ └── ...
│ ├── layouts/
│ │ └── base.njk
│ └── pages/
│   ├── index.njk
│   └── contacts.njk
├── oxfmt.config.json
├── oxlint.config.json
├── package.json
└── vite.config.ts

---

## Работа с данными (JSON)

Все файлы из `src/data/` становятся глобальными переменными.

### Пример site.json

{
"siteName": "Мой питомник растений",
"phone": "+7 (123) 456-78-90"
}

### Использование в шаблоне

<header>
  <a href="/" class="logo">{{ site.siteName }}</a>
  <a href="tel:{{ site.phone }}">{{ site.phone }}</a>
</header>

---

## SVG-спрайт

Плагин @spiriit/vite-plugin-svg-spritemap собирает все SVG в `/assets/svg/spritemap.svg`.

### Использование

<svg class="sprite-icon">
  <use xlink:href="/assets/svg/spritemap.svg#geo"></use>
</svg>

### Стилизация

.sprite-icon {
width: 24px;
height: 24px;
fill: currentColor;
stroke: currentColor;
vertical-align: middle;
}

---

## Используемые технологии

- Vite
- Vituum
- vite-plus
- Nunjucks
- SCSS
- oxlint / oxfmt
- rollup-plugin-visualizer
- vite-plugin-webfont-dl
- vite-plugin-compression
- @spiriit/vite-plugin-svg-spritemap
- Bootstrap 5.3
- GSAP + ScrollTrigger
- Lenis
- Swiper
- lightGallery

---

## Конфигурация

Основной файл — `vite.config.ts` (TypeScript). Плагины подключаются условно в зависимости от режима (только `production` или всегда).

Старый JS-конфиг сохранён как `vite.config_old.js`.

---

## Перенос в MODX

1. npx vp build
2. Скопировать dist/ в assets/templates/
3. Заменить переменные:

Nunjucks → MODX  
{{ site.siteName }} → [[++site_name]]  
{% for item in menu.items %} → pdoMenu  
{{ resource.pagetitle }} → [[*pagetitle]]

4. Разбить страницы на шаблоны и чанки.

---

# 🇬🇧 English Description

## Features

- Instant HMR
- Component-based architecture
- Multi-page support
- Global JSON data
- MODX-friendly
- SCSS + autoprefixer
- SVG spritemap
- oxlint / oxfmt
- Production build

---

## Installation

git clone https://github.com/FrenkiArt/vite-template.git your-project
cd your-project
npm install
npx vp dev
npx vp build

---

## Working with Data (JSON)

Same as in the Russian section.

---

## SVG Spritemap

Same usage as above.

---

## Technologies Used

- Vite
- Vituum
- vite-plus
- Nunjucks
- SCSS
- oxlint / oxfmt
- rollup-plugin-visualizer
- vite-plugin-webfont-dl
- @spiriit/vite-plugin-svg-spritemap
- Bootstrap 5.3
- GSAP
- Swiper

---

## Porting to MODX

Same steps as in the Russian section.

---

## 📬 Contact

Telegram: @artywork  
Repository: https://github.com/FrenkiArt/vite-template

Happy coding!

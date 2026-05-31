# QwizSlider - Документация

## Описание

`QwizSlider` — легковесный класс для создания многошаговых форм (квизов) с плавной анимацией, валидацией и удобной навигацией.

### Особенности

- ✅ Плавный переход с cross-fade анимацией
- ✅ Валидация обязательных полей перед переходом
- ✅ Автоматический переход к следующему шагу при выборе radio/checkbox (опционально)
- ✅ Умный автофокус: фокусирует выбранный элемент или первый интерактивный элемент
- ✅ Автофокус срабатывает сразу, не ждёт конца анимации
- ✅ Управление через API: переход вперёд, назад, к конкретному шагу
- ✅ События для кастомной логики (переходы, отправка)
- ✅ Простая автоматическая инициализация по `data-qwiz` атрибуту
- ✅ Глобальный доступ через `window.QwizSlider`

---

## Установка

### Подключение на страницу

```html
<link rel="stylesheet" href="qwiz.css" />
<script src="qwiz.js"></script>
```

---

## Использование

### HTML структура

Минимальная структура квиза:

```html
<form data-qwiz="mainQuiz" autocomplete="off">
  <!-- Слайд 1 (первый видимый) -->
  <div data-qwiz-slide="1" class="active">
    <h2>Вопрос 1</h2>
    <p>Содержимое первого вопроса</p>
    <button data-qwiz-btn-next type="button">Далее</button>
  </div>

  <!-- Слайд 2 -->
  <div data-qwiz-slide="2">
    <h2>Вопрос 2</h2>
    <label>
      <input type="radio" name="answer1" value="option1" required />
      Вариант 1
    </label>
    <label>
      <input type="radio" name="answer1" value="option2" required />
      Вариант 2
    </label>
    <div>
      <button data-qwiz-btn-prev type="button">Назад</button>
      <button data-qwiz-btn-next type="button">Далее</button>
    </div>
  </div>

  <!-- Слайд 3 (последний) -->
  <div data-qwiz-slide="3">
    <h2>Финальный вопрос</h2>
    <input type="text" name="email" placeholder="Ваш email" required />
    <div>
      <button data-qwiz-btn-prev type="button">Назад</button>
      <button type="submit">Отправить</button>
    </div>
  </div>
</form>
```

### Обязательные элементы

- `<form data-qwiz="ID">` — контейнер квиза с уникальным ID
- `<div data-qwiz-slide="N">` — каждый слайд (N — номер)
- `<button data-qwiz-btn-next>` — кнопка для перехода вперёд
- `<button data-qwiz-btn-prev>` — кнопка для перехода назад
- `class="active"` на первом слайде (обязателен для отображения)

---

## Инициализация

### Автоматическая инициализация (рекомендуется)

При загрузке страницы скрипт автоматически найдет все элементы с `data-qwiz` и создаст экземпляры:

```html
<form data-qwiz="mainQuiz" data-auto-next="true" autocomplete="off">
  <!-- слайды -->
</form>

<script src="qwiz.js"></script>
<!-- Готово! Экземпляр доступен как window.mainQuiz -->
```

Экземпляр будет доступен через:

- `window.mainQuiz` (по ID из `data-qwiz`)
- `form._qwizInstance` (напрямую на элементе формы)

### Ручная инициализация

Если нужно создать экземпляр из JavaScript:

```js
const qwiz = new QwizSlider('[data-qwiz="mainQuiz"]', {
  autoNextOnChange: true,
  autoNextDelay: 300,
  animationDuration: 400,
  firstActiveSlide: 1,
  autoFocus: true,
});

// Сохраняем для дальнейшего использования
window.myQwiz = qwiz;
```

---

## Data атрибуты (настройки в HTML)

| Атрибут                   | Значение         | Описание                                   |
| ------------------------- | ---------------- | ------------------------------------------ |
| `data-qwiz`               | строка           | ID квиза (обязателен)                      |
| `data-auto-next`          | `true` / `false` | Включить автоматический переход при выборе |
| `data-auto-next-delay`    | число (мс)       | Задержка перед автоматическим переходом    |
| `data-animation-duration` | число (мс)       | Длительность анимации переходов            |

### Примеры

```html
<!-- С автоскроллом и быстрой анимацией -->
<form
  data-qwiz="quiz1"
  data-auto-next="true"
  data-auto-next-delay="200"
  data-animation-duration="250"
>
  <!-- слайды -->
</form>

<!-- С медленной анимацией и без автоскролла -->
<form data-qwiz="quiz2" data-animation-duration="600">
  <!-- слайды -->
</form>
```

---

## Опции конструктора

| Опция               | Тип        | По умолчанию | Описание                                                           |
| ------------------- | ---------- | ------------ | ------------------------------------------------------------------ |
| `animationDuration` | число (мс) | 300          | Длительность анимации перехода между слайдами                      |
| `firstActiveSlide`  | число      | 1            | С какого слайда (номер) разрешён переход назад                     |
| `autoFocus`         | boolean    | true         | Автоматически фокусировать выбранный или первый инпут              |
| `autoNextOnChange`  | boolean    | false        | Автоматический переход к следующему шагу при выборе radio/checkbox |
| `autoNextDelay`     | число (мс) | 300          | Задержка перед автоматическим переходом                            |

### Пример использования всех опций

```js
const qwiz = new QwizSlider('[data-qwiz="advancedQuiz"]', {
  animationDuration: 400, // Плавная анимация
  firstActiveSlide: 2, // Можно вернуться со 2-го слайда
  autoFocus: true, // Фокусировать выбранный элемент
  autoNextOnChange: true, // Переход при выборе
  autoNextDelay: 500, // С задержкой в пол-секунды
});
```

---

## Методы

### Навигация

#### `next()`

Переход к следующему слайду (если текущий валиден).

```js
qwiz.next(); // true или false (успех/неудача)
```

#### `prev()`

Переход к предыдущему слайду.

```js
qwiz.prev(); // true или false
```

#### `goToSlide(index, skipValidation = false)`

Переход к слайду по индексу (начинается с 0).

```js
qwiz.goToSlide(2); // К 3-му слайду
qwiz.goToSlide(2, true); // Пропустить валидацию
```

#### `goToSlideNumber(slideNumber, skipValidation = false)`

Переход к слайду по номеру (начинается с 1).

```js
qwiz.goToSlideNumber(3); // К 3-му слайду (более удобно)
qwiz.goToSlideNumber(3, true); // Без валидации
```

### Получение информации

#### `getCurrentSlideIndex()`

Возвращает текущий индекс (с 0).

```js
const index = qwiz.getCurrentSlideIndex(); // 0, 1, 2...
```

#### `getCurrentSlideNumber()`

Возвращает текущий номер (с 1).

```js
const number = qwiz.getCurrentSlideNumber(); // 1, 2, 3...
```

#### `getTotalSlides()`

Возвращает общее количество слайдов.

```js
const total = qwiz.getTotalSlides(); // Например: 7
```

#### `getFormData()`

Возвращает объект с данными всей формы.

```js
const data = qwiz.getFormData();
console.log(data); // { answer1: "option2", email: "user@example.com" }
```

### Управление состоянием

#### `reset()`

Сброс формы и возврат к первому слайду.

```js
qwiz.reset();
```

#### `destroy()`

Уничтожение экземпляра и очистка обработчиков.

```js
qwiz.destroy();
qwiz = null; // Удалить ссылку
```

---

## События

### `qwiz:slideChanged`

Вызывается при переходе на новый слайд.

```js
const form = document.querySelector('[data-qwiz="mainQuiz"]');

form.addEventListener("qwiz:slideChanged", (e) => {
  console.log("Текущий слайд:", e.detail.currentIndex + 1);
  console.log("Всего слайдов:", e.detail.totalSlides);

  // Пример: показать прогресс
  const progress = ((e.detail.currentIndex + 1) / e.detail.totalSlides) * 100;
  console.log(`Прогресс: ${progress}%`);
});
```

### `qwiz:submit`

Вызывается при отправке формы.

```js
form.addEventListener("qwiz:submit", (e) => {
  const formData = e.detail.formData;
  console.log("Отправляем данные:", formData);

  // Отправить на сервер
  fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
});
```

---

## Автофокус (новая особенность)

Класс имеет умный автофокус, который работает следующим образом:

1. **При первом открытии слайда** — фокусирует первый интерактивный элемент
2. **При возврате на слайд** — если элемент уже выбран (radio/checkbox), фокусирует его
3. **При возврате на слайд** — если ничего не выбрано, фокусирует первый элемент
4. **Срабатывает сразу** — не ждёт завершения анимации перехода

Пример:

```html
<div data-qwiz-slide="2">
  <label>
    <input type="radio" name="q2" value="a" />
    Вариант A
  </label>
  <label>
    <input type="radio" name="q2" value="b" />
    Вариант B (если был выбран, то при возврате на этот слайд будет в фокусе)
  </label>
</div>
```

---

## Примеры использования

### Пример 1: Простой квиз с автоскроллом

```html
<form data-qwiz="simpleQuiz" data-auto-next="true" autocomplete="off">
  <div data-qwiz-slide="1" class="active">
    <h3>Какой ваш любимый язык?</h3>
    <label><input type="radio" name="lang" value="js" required /> JavaScript</label>
    <label><input type="radio" name="lang" value="python" required /> Python</label>
  </div>

  <div data-qwiz-slide="2">
    <h3>Спасибо! Вы выбрали: <span id="selected"></span></h3>
    <button data-qwiz-btn-prev>Назад</button>
    <button type="submit">Завершить</button>
  </div>
</form>

<script src="qwiz.js"></script>
<script>
  document.querySelector('[data-qwiz="simpleQuiz"]').addEventListener("qwiz:slideChanged", (e) => {
    if (e.detail.currentIndex === 1) {
      const selected = document.querySelector('input[name="lang"]:checked').value;
      document.getElementById("selected").textContent = selected;
    }
  });
</script>
```

### Пример 2: Квиз с прогресс-баром

```html
<div class="progress">
  <div class="progress-bar" id="progressBar"></div>
</div>

<form data-qwiz="progressQuiz" autocomplete="off">
  <div data-qwiz-slide="1" class="active"><!-- Слайд 1 --></div>
  <div data-qwiz-slide="2"><!-- Слайд 2 --></div>
  <div data-qwiz-slide="3"><!-- Слайд 3 --></div>
  <div data-qwiz-slide="4"><!-- Слайд 4 --></div>
  <div data-qwiz-slide="5"><!-- Слайд 5 --></div>
</form>

<script src="qwiz.js"></script>
<script>
  const form = document.querySelector('[data-qwiz="progressQuiz"]');
  const progressBar = document.getElementById("progressBar");

  form.addEventListener("qwiz:slideChanged", (e) => {
    const progress = ((e.detail.currentIndex + 1) / e.detail.totalSlides) * 100;
    progressBar.style.width = progress + "%";
  });
</script>
```

### Пример 3: Программное управление

```js
// Инициализация
const qwiz = new QwizSlider('[data-qwiz="controlledQuiz"]', {
  autoNextOnChange: false,
  animationDuration: 500,
});

// Кнопка для перехода к конкретному вопросу
document.getElementById("jumpToQuestion3").addEventListener("click", () => {
  qwiz.goToSlideNumber(3);
});

// Показать текущий прогресс
document.getElementById("progressBtn").addEventListener("click", () => {
  const current = qwiz.getCurrentSlideNumber();
  const total = qwiz.getTotalSlides();
  alert(`Вы на вопросе ${current} из ${total}`);
});

// Отправить форму вручную
document.getElementById("submitBtn").addEventListener("click", () => {
  const data = qwiz.getFormData();
  console.log("Отправляем:", data);
  // Отправить на сервер...
});
```

---

## CSS Стили

Минимальный CSS (файл `qwiz.css`):

```css
/* Основной контейнер квиза */
.qwiz-wrapper {
  position: relative;
  min-height: 400px;
}

/* Базовые стили слайдов */
.qwiz-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms ease-in-out;
  will-change: opacity;
}

/* Активный слайд */
.qwiz-slide.active {
  opacity: 1;
  visibility: visible;
}

/* Блокировка взаимодействия во время анимации */
.qwiz-wrapper.is-animating {
  pointer-events: none;
}
```

---

## Советы и рекомендации

### 1. Валидация полей

Используй атрибут `required` на инпутах для обязательных полей:

```html
<input type="email" name="email" required /> <input type="radio" name="choice" value="a" required />
```

### 2. Обработка отправки

Используй событие `qwiz:submit` для обработки данных:

```js
form.addEventListener("qwiz:submit", (e) => {
  // Отправить на сервер, показать сообщение и т.д.
});
```

### 3. Анимация с задержкой

Настрой `autoNextDelay` для времени, достаточного пользователю прочитать вопрос:

```html
<form data-qwiz="timed" data-auto-next="true" data-auto-next-delay="1000"></form>
```

### 4. Доступность

Убедись, что кнопки имеют корректные `type` и `aria-label`:

```html
<button data-qwiz-btn-next type="button" aria-label="Перейти к следующему вопросу">Далее</button>
```

### 5. Адаптивный дизайн

Квиз автоматически адаптируется под размер контейнера:

```css
@media (max-width: 768px) {
  .qwiz-wrapper {
    min-height: 300px;
  }
}
```

### 6. Отключение автофокуса

Если нужно отключить автоматическую фокусировку:

```js
const qwiz = new QwizSlider('[data-qwiz="noFocus"]', {
  autoFocus: false,
});
```

---

## Устранение проблем

### Квиз не инициализируется

- Проверь, что `data-qwiz="ID"` указан на форме
- Убедись, что скрипт загружен после HTML
- Проверь консоль браузера на ошибки

### Кнопка "Далее" не работает

- Проверь, что есть обязательные поля (`required`)
- Убедись, что они заполнены перед переходом
- Проверь консоль на предупреждения QwizSlider

### Первый слайд не видно

- Добавь `class="active"` на первый `[data-qwiz-slide]`
- Проверь, что подключены стили `qwiz.css`

### Переход происходит медленнее ожидаемого

- Увеличь/уменьши `animationDuration`
- Проверь, не блокирует ли что-нибудь `JavaScript` главный поток

### Автофокус не работает

- Убедись, что `autoFocus: true` в опциях (по умолчанию включено)
- Проверь, что на слайде есть интерактивные элементы (input, textarea, select)
- Убедись, что элемент не имеет атрибута `disabled`

---

## История обновлений

### v1.1.0

- ✨ Добавлен умный автофокус (фокусирует выбранный элемент при возврате на слайд)
- ✨ Автофокус теперь срабатывает сразу, не ждёт конца анимации
- 🐛 Исправлена проблема с фокусировкой при инициализации

### v1.0.0

- 🎉 Первая версия класса QwizSlider

---

## Лицензия

MIT

---

## Поддержка

Если возникли вопросы — обращайся!

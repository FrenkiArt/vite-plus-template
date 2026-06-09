import IMask from "imask";
//import lightGallery from 'lightgallery';
//import lgFullscreen from 'lightgallery/plugins/fullscreen';
import "bootstrap/js/dist/modal";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import ScrollSpy from "bootstrap/js/dist/scrollspy";

//import Swiper from "swiper";
//import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initSmartSticky from "./sticky-smart.js";
import initScrollAnimations from "./scroll-animations.js";

//Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);

// Инициализация Lenis (плавный скролл)
const lenis = new Lenis({
  autoRaf: true,
  anchors: {
    userData: { isAnchor: true },
  },
});

// Синхронизация Lenis + ScrollTrigger
lenis.on("scroll", () => ScrollTrigger.update());

// Стоп Lenis при открытии offcanvas, старт при закрытии
document.addEventListener("show.bs.offcanvas", () => lenis.stop());
document.addEventListener("hidden.bs.offcanvas", () => lenis.start());

// Закрытие offcanvas при клике по анкорной ссылке (#...),
// затем скролл к цели через Lenis
document.addEventListener("click", (e) => {
  const link = e.target.closest('.offcanvas a[href^="#"]');
  if (!link) return;

  const offcanvasEl = link.closest(".offcanvas");
  const offcanvas = Offcanvas.getInstance(offcanvasEl);
  const href = link.getAttribute("href");

  lenis.start(); // запускаем RAF до закрытия, чтобы Lenis был стабилен
  offcanvas.hide();

  offcanvasEl.addEventListener(
    "hidden.bs.offcanvas",
    () => {
      lenis.scrollTo(href, { userData: { isAnchor: true } });
    },
    { once: true },
  );
});

// Инициализация при загрузке DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  initTelMasks();
  // initLightGalleries();
  //initTemplateSlider();
  //initTemplateSlider2();
  initScrollAnimations();
  initSmartSticky(lenis);

  enableHorizontalScroll("[data-xscroll]");
  //enableDragScroll('[data-xscroll]');

  document.querySelectorAll("[data-btncopy]").forEach((btn) => {
    btn.addEventListener("click", btnCopyHandler);
  });

  initModalChangeble();

  if (document.querySelector(".window-size")) {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
  }

  const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]');
  dataSpyList.forEach((dataSpyEl) => {
    ScrollSpy.getInstance(dataSpyEl)?.dispose();
    new ScrollSpy(dataSpyEl, {
      threshold: [0.1, 0.5, 0.9],
    });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => initTightLists(".prose"));
  } else {
    window.addEventListener("load", () => initTightLists(".prose"));
  }
});

// Функция инициализации масок телефонных номеров
function initTelMasks() {
  const telInputs = document.querySelectorAll("input[type=tel]");
  telInputs.forEach((el) => {
    IMask(el, {
      mask: "+{7} 000 000 00 00",
    });
  });
}

// Функция инициализации галерей изображений
// eslint-disable-next-line no-unused-vars
function initLightGalleries() {
  const galleryElements = document.querySelectorAll("[data-gallery]");
  galleryElements.forEach((el) => {
    // eslint-disable-next-line no-undef
    lightGallery(el, {
      licenseKey: "0000 0000 0000 0000",
      download: false,
      fullScreen: false,
      // eslint-disable-next-line no-undef
      plugins: [lgFullscreen],
      selector: "[data-src]",
    });
  });
}

// eslint-disable-next-line no-unused-vars
function initTemplateSlider() {
  // eslint-disable-next-line no-undef
  const _slider = new Swiper(".slider-template", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// eslint-disable-next-line no-unused-vars
function initTemplateSlider2() {
  // eslint-disable-next-line no-undef
  const _slider = new Swiper(".slider-template2", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// Авто-определение однострочных списков
function initTightLists(container) {
  const root = container ? document.querySelector(container) : document;
  if (!root) return;
  const lists = root.querySelectorAll("ul, ol");

  for (const list of lists) {
    const items = list.querySelectorAll(":scope > li");
    let allSingleLine = true;

    for (const li of items) {
      const lh = parseFloat(getComputedStyle(li).lineHeight);
      if (li.scrollHeight > lh + 1) {
        allSingleLine = false;
        break;
      }
    }

    if (allSingleLine && items.length > 0) {
      list.classList.add("tight");
    }
  }
}

function enableHorizontalScroll(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    el.addEventListener(
      "wheel",
      (e) => {
        if (el.scrollWidth <= el.clientWidth) return;

        e.stopPropagation();
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "smooth" });
      },
      { passive: false },
    );
  });
}

// eslint-disable-next-line no-unused-vars
function enableDragScroll(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener("mousedown", (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener("mouseleave", () => {
      isDown = false;
      el.classList.remove("dragging");
    });

    el.addEventListener("mouseup", () => {
      isDown = false;
      el.classList.remove("dragging");
    });

    el.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // скорость
      el.scrollLeft = scrollLeft - walk;
    });
  });
}

function btnCopyHandler(e) {
  // Сохраняем элемент в переменную синхронно
  const targetElement = e.currentTarget;

  // Проверяем существование элемента
  if (!targetElement) {
    console.error("Элемент не найден");
    return;
  }

  // Извлекаем данные из атрибута
  const htmlContent = targetElement.getAttribute("data-btncopy");
  if (!htmlContent) return;

  // Создаем временный контейнер для преобразования HTML в текст
  const container = document.createElement("div");
  container.innerHTML = htmlContent;

  // Преобразуем HTML в чистый текст с переносами
  const formattedText = Array.from(container.childNodes)
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim();
      } else if (node.nodeName === "BR") {
        return "\n";
      }
      return "";
    })
    .join("")
    .replace(/\s+/g, " ") // Убираем лишние пробелы
    .replace(/\n /g, "\n") // Чистим пробелы после переносов
    .trim();

  // Копируем в буфер обмена
  navigator.clipboard
    .writeText(formattedText)
    .then(() => {
      console.log("Данные скопированы!");

      // Визуальный фидбек с проверкой существования элемента
      if (document.body.contains(targetElement)) {
        targetElement.classList.add("copied");
        setTimeout(() => {
          if (document.body.contains(targetElement)) {
            targetElement.classList.remove("copied");
          }
        }, 2000);
      }
    })
    .catch((err) => {
      console.error("Ошибка копирования:", err);
    });
}

const checkWindowSize = () => {
  const windowSize = document.querySelector(".window-size");
  windowSize.textContent = window.innerWidth;
};

// Функция инициализации изменяемых модальных окон
function initModalChangeble() {
  const modalChangebleEls = document.querySelectorAll("[data-modal-changeble]");

  modalChangebleEls.forEach((modalEl) => {
    modalEl.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const newTitle = button.getAttribute("data-modal-title");
      const newSubTitle = button.getAttribute("data-modal-subtitle");
      const whomInfo = button.getAttribute("data-whom");
      const newText = button.getAttribute("data-modal-text");
      const btnInnerText = button.getAttribute("data-modal-btn-text");

      const modalTitleEl = modalEl.querySelector("[data-modal-title]");
      const modalSubTitleEl = modalEl.querySelector("[data-modal-subtitle]");
      const modalTextEl = modalEl.querySelector("[data-modal-text]");
      const modalWhomEl = modalEl.querySelector("[data-whom]");
      const modalBtnEl = modalEl.querySelector("[data-modal-btn-text]");

      if (modalTitleEl && newTitle) {
        modalTitleEl.innerHTML = newTitle;
      }
      if (modalSubTitleEl && newSubTitle) {
        modalSubTitleEl.innerHTML = newSubTitle;
      }
      if (modalTextEl && newText) {
        modalTextEl.innerHTML = newText;
      }
      if (modalWhomEl && whomInfo) {
        modalWhomEl.value = whomInfo;
      }
      if (btnInnerText && modalBtnEl) {
        modalBtnEl.innerText = btnInnerText;
      }
    });
  });
}

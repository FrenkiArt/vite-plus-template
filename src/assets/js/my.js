// import IMask from 'imask';
//import lightGallery from 'lightgallery';
//import lgFullscreen from 'lightgallery/plugins/fullscreen';
import { Modal } from "bootstrap/js/dist/modal";

import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);

// Инициализация Lenis (плавный скролл)
const lenis = new Lenis({
  autoRaf: true,
});

// Синхронизация Lenis + ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Инициализация при загрузке DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  // initTelMasks();
  // initLightGalleries();
  initTemplateSlider();
  initTemplateSlider2();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => initTightLists(".prose"));
  } else {
    window.addEventListener("load", initTightLists);
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
function initLightGalleries() {
  const galleryElements = document.querySelectorAll("[data-gallery]");
  galleryElements.forEach((el) => {
    lightGallery(el, {
      licenseKey: "0000 0000 0000 0000",
      download: false,
      fullScreen: false,
      plugins: [lgFullscreen],
      selector: "[data-src]",
    });
  });
}

function initTemplateSlider() {
  const slider = new Swiper(".slider-template", {
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

function initTemplateSlider2() {
  const slider = new Swiper(".slider-template2", {
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

// Экспорт модального окна для доступа извне
window.modal = Modal;

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

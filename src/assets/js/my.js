// import IMask from 'imask';
//import lightGallery from 'lightgallery';
//import lgFullscreen from 'lightgallery/plugins/fullscreen';
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/offcanvas";

//import Swiper from "swiper";
//import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initSmartSticky from "./sticky-smart.js";

gsap.registerPlugin(ScrollTrigger);

//Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);

// Инициализация Lenis (плавный скролл)
const lenis = new Lenis({
  autoRaf: true,
  anchors: {
    userData: { isAnchor: true },
  },
});

// Синхронизация Lenis + ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Инициализация при загрузке DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  // initTelMasks();
  // initLightGalleries();
  //initTemplateSlider();
  //initTemplateSlider2();
  initScrollAnimations();
  initSmartSticky(lenis);

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

function initScrollAnimations() {
  const fx = {
    fade: [
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 },
    ],
    "slide-up": [
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0 },
      { opacity: 0, y: -40 },
    ],
    zoom: [
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 1.2 },
    ],
    "slide-left": [
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0 },
      { opacity: 0, x: -80 },
    ],
    "slide-right": [
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0 },
      { opacity: 0, x: 80 },
    ],
  };

  function mergeStates(names) {
    const out = [{}, {}, {}];
    names.forEach((name) => {
      const s = fx[name];
      if (s) {
        out[0] = { ...out[0], ...s[0] };
        out[1] = { ...out[1], ...s[1] };
        out[2] = { ...out[2], ...s[2] };
      }
    });
    return out;
  }

  gsap.utils.toArray("[data-scroll]").forEach((el) => {
    const raw = el.dataset.scroll || "slide-up";
    const names = raw.split(/\s+/);
    const start = el.dataset.scrollStart || "bottom bottom";
    const end = el.dataset.scrollEnd || "top top";

    // ═══ blur ═══
    if (names.length === 1 && names[0] === "blur") {
      const p = { v: 8, opacity: 0 };
      el.style.filter = "blur(8px)";
      el.style.opacity = 0;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub: true },
      });

      tl.to(p, {
        v: 0, opacity: 1, duration: 0.11, ease: "cubic-bezier(0,0,0.5,1)",
        onUpdate: () => {
          el.style.filter = `blur(${p.v}px)`;
          el.style.opacity = p.opacity;
        },
      })
      .to(p, {
        v: 8, opacity: 0, duration: 0.1, ease: "cubic-bezier(0,0,0.5,1)",
        onUpdate: () => {
          el.style.filter = `blur(${p.v}px)`;
          el.style.opacity = p.opacity;
        },
      }, 0.89);

      return;
    }

    // ═══ clip-up ═══
    if (names.length === 1 && names[0] === "clip-up") {
      const p = { top: 100, bottom: 0 };
      el.style.clipPath = "inset(100% 0 0 0)";

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub: true },
      });

      tl.to(p, {
        top: 0, duration: 0.11, ease: "cubic-bezier(0,0,0.5,1)",
        onUpdate: () => {
          el.style.clipPath = `inset(${p.top}% 0 ${p.bottom}% 0)`;
        },
      })
      .to(p, {
        bottom: 100, duration: 0.1, ease: "cubic-bezier(0,0,0.5,1)",
        onUpdate: () => {
          el.style.clipPath = `inset(${p.top}% 0 ${p.bottom}% 0)`;
        },
      }, 0.89);

      return;
    }

    // ═══ mix или одиночный эффект ═══
    const states = mergeStates(names);

    gsap.set(el, states[0]);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
      },
    });

    // Таймлайн маппится на start→end (от низа экрана до верха).
    // duration — доля этого диапазона.
    // Второй параметр .to() — позиция старта на таймлайне.
    //
    //   0% ───────────────────────────── 100%  ← скролл от start до end
    //   │  вхoд  │          холд          │выход│
    //   │  11%   │          78%           │ 11% │
    //   └─►states[1]◄────────────────────►states[2]
    //   states[0] (предустановлен gsap.set)

    tl.to(el, { ...states[1], duration: 0.11, ease: "cubic-bezier(0,0,0.5,1)" })
      .to(el, { ...states[2], duration: 0.1, ease: "cubic-bezier(0,0,0.5,1)" }, 0.89);
  });
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function initScrollAnimations() {
  const fx = {
    fade: [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
    "slide-up": [
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0 },
      { opacity: 0, y: -40 },
    ],
    zoom: [
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.8 },
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
    blur: [
      { opacity: 0, _blur: 8 },
      { opacity: 1, _blur: 0 },
      { opacity: 0, _blur: 8 },
    ],
    "clip-up": [
      { _clipTop: 100, _clipBottom: 0 },
      { _clipTop: 0, _clipBottom: 0 },
      { _clipTop: 0, _clipBottom: 100 },
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
    const start = el.dataset.scrollStart || "top 89%";
    const end = el.dataset.scrollEnd || "bottom 11%";

    const states = mergeStates(names);

    const proxy = {};
    const cssStates = [{}, {}, {}];
    let hasProxy = false;

    for (let i = 0; i < 3; i++) {
      for (const [key, val] of Object.entries(states[i])) {
        if (key.startsWith("_")) {
          if (i === 0) proxy[key] = val;
          hasProxy = true;
        } else {
          cssStates[i][key] = val;
        }
      }
    }

    gsap.set(el, cssStates[0]);
    if (proxy._blur !== undefined) el.style.filter = `blur(${proxy._blur}px)`;
    if (proxy._clipTop !== undefined)
      el.style.clipPath = `inset(${proxy._clipTop}% 0 ${proxy._clipBottom}% 0)`;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start, end, scrub: true },
    });

    if (hasProxy) {
      const onUpdate = () => {
        if (proxy._blur !== undefined) el.style.filter = `blur(${proxy._blur}px)`;
        if (proxy._clipTop !== undefined)
          el.style.clipPath = `inset(${proxy._clipTop}% 0 ${proxy._clipBottom}% 0)`;
      };

      const proxyTween1 = { duration: 0.07, ease: "cubic-bezier(0.25,0.1,0.25,1)", onUpdate };
      const proxyTween2 = { duration: 0.07, ease: "cubic-bezier(0.25,0.1,0.25,1)", onUpdate };

      if (states[1]._blur !== undefined) proxyTween1._blur = states[1]._blur;
      if (states[2]._blur !== undefined) proxyTween2._blur = states[2]._blur;
      if (states[1]._clipTop !== undefined) proxyTween1._clipTop = states[1]._clipTop;
      if (states[2]._clipTop !== undefined) proxyTween2._clipTop = states[2]._clipTop;
      if (states[1]._clipBottom !== undefined) proxyTween1._clipBottom = states[1]._clipBottom;
      if (states[2]._clipBottom !== undefined) proxyTween2._clipBottom = states[2]._clipBottom;

      tl.to(proxy, proxyTween1, 0)
        .to(el, { ...cssStates[1], duration: 0.11, ease: "cubic-bezier(0.25,0.1,0.25,1)" }, 0)
        .to(proxy, proxyTween2, 0.93)
        .to(el, { ...cssStates[2], duration: 0.1, ease: "cubic-bezier(0.25,0.1,0.25,1)" }, 0.89);
    } else {
      tl.to(el, { ...cssStates[1], duration: 0.11, ease: "cubic-bezier(0.25,0.1,0.25,1)" }).to(
        el,
        { ...cssStates[2], duration: 0.1, ease: "cubic-bezier(0.25,0.1,0.25,1)" },
        0.89,
      );
    }
  });
}

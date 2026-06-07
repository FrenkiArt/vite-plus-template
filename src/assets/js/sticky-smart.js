export default function initSmartSticky(lenis) {
  const header = document.querySelector("[data-sticky-smart]");
  if (!header) return;

  function updateHeight() {
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`
    );
  }

  updateHeight();
  window.addEventListener("resize", updateHeight);

  lenis.on("scroll", (e) => {
    if (e.userData?.isAnchor) return;

    if (e.animatedScroll > 0) {
      const dir = Math.sign(e.velocity);
      if (dir > 0) header.classList.add("sticky-hidden");
      else if (dir < 0) header.classList.remove("sticky-hidden");
    } else {
      header.classList.remove("sticky-hidden");
    }

    header.classList.toggle("sticky-shadow", e.animatedScroll > 0 && !header.classList.contains("sticky-hidden"));
  });
}

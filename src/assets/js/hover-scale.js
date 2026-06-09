function initHoverScale() {
  const groups = document.querySelectorAll(".h-scale-group");

  groups.forEach((group) => {
    const wraps = group.querySelectorAll(".h-scale-wrap");

    function resetAll() {
      wraps.forEach((wrap) => {
        const item = wrap.querySelector(".h-scale-item");
        if (item) item.style.setProperty("--h-scale", "1");
      });
    }

    wraps.forEach((wrap) => {
      const item = wrap.querySelector(".h-scale-item");
      if (!item) return;

      item.addEventListener("mouseenter", () => {
        resetAll();

        item.style.setProperty("--h-scale", "1.1");

        const prev = wrap.previousElementSibling;
        if (prev?.matches(".h-scale-wrap")) {
          const prevItem = prev.querySelector(".h-scale-item");
          if (prevItem) prevItem.style.setProperty("--h-scale", "1.05");
        }

        const next = wrap.nextElementSibling;
        if (next?.matches(".h-scale-wrap")) {
          const nextItem = next.querySelector(".h-scale-item");
          if (nextItem) nextItem.style.setProperty("--h-scale", "1.05");
        }
      });
    });

    group.addEventListener("mouseleave", resetAll);
  });
}

document.addEventListener("DOMContentLoaded", initHoverScale);


(function () {
  const lightbox  = document.getElementById("lightbox");
  const imgEl     = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const closeBtn  = document.getElementById("lightbox-close");
  const prevBtn   = document.getElementById("lightbox-prev");
  const nextBtn   = document.getElementById("lightbox-next");

  let current = 0;

  function open(i) {
    const list = window.CURRENT_GALLERY || [];
    if (!list.length) return;
    current = (i + list.length) % list.length;
    imgEl.src           = list[current].src;
    imgEl.alt           = list[current].caption;
    captionEl.textContent = list[current].caption;
    lightbox.hidden     = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  
  document.getElementById("project-gallery").addEventListener("click", e => {
    const img = e.target.closest("img[data-index]");
    if (img) open(parseInt(img.dataset.index, 10));
  });

  closeBtn.addEventListener("click", close);
  prevBtn .addEventListener("click", () => open(current - 1));
  nextBtn .addEventListener("click", () => open(current + 1));

  
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) close();
  });

  
  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape")     close();
    if (e.key === "ArrowLeft")  open(current - 1);
    if (e.key === "ArrowRight") open(current + 1);
  });
})();

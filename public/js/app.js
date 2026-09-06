document.getElementById("year").textContent = new Date().getFullYear();

// --- category filter (scoped to the reel strip only, never the hero card) ---
const filters = document.querySelectorAll(".filter");
const reelCards = Array.from(document.querySelectorAll(".reel-strip .card"));
const allCards = Array.from(document.querySelectorAll(".card"));
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const f = btn.getAttribute("data-filter");
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    reelCards.forEach((c) => {
      const show = f === "الكل" || c.getAttribute("data-cat") === f;
      c.toggleAttribute("hidden", !show);
    });
  });
});

// --- lightbox ---
const lb = document.getElementById("lightbox");
const lbVideo = document.getElementById("lb-video");
const lbClose = document.getElementById("lb-close");

function openCard(card) {
  const slug = card.getAttribute("data-slug");
  lbVideo.src = `videos/${slug}.mp4`;
  lb.classList.add("is-open");
  document.body.style.overflow = "hidden";
  lbVideo.play().catch(() => {});
}
function closeLb() {
  lb.classList.remove("is-open");
  lbVideo.pause();
  lbVideo.removeAttribute("src");
  lbVideo.load();
  document.body.style.overflow = "";
}
allCards.forEach((c) => c.addEventListener("click", () => openCard(c)));
lbClose.addEventListener("click", closeLb);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

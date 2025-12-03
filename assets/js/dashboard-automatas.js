document.querySelectorAll(".acordion-header button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const acordion = btn.closest(".acordion");
    acordion.classList.toggle("open");
  });
});
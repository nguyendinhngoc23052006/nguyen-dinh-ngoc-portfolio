(() => {
  function getTheme() {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.setAttribute("data-theme", getTheme());
  window.addEventListener("storage", (e) => {
    if (
      e.key === "theme" &&
      (e.newValue === "light" || e.newValue === "dark")
    ) {
      document.documentElement.setAttribute("data-theme", e.newValue);
    }
  });
})();

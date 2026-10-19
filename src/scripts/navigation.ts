const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let manualTheme: string | null = null;
try {
  manualTheme = localStorage.getItem("uzstack-theme");
} catch {
  /* Storage is optional. */
}
function applyTheme(dark: boolean) {
  root.dataset.theme = dark ? "dark" : "light";
  toggle?.setAttribute("aria-pressed", String(dark));
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#080f1d" : "#f7f9fc");
}
if (toggle) {
  toggle.hidden = false;
  applyTheme(root.dataset.theme === "dark");
  toggle.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    manualTheme = dark ? "dark" : "light";
    applyTheme(dark);
    try {
      localStorage.setItem("uzstack-theme", manualTheme);
    } catch {
      /* Keep working without persistence. */
    }
  });
}
systemTheme.addEventListener("change", (event) => {
  if (manualTheme !== "dark" && manualTheme !== "light")
    applyTheme(event.matches);
});

const menu = document.querySelector<HTMLButtonElement>(".menu-toggle");
const nav = document.querySelector<HTMLElement>("#main-nav");
if (menu && nav) {
  menu.hidden = false;
  root.classList.add("has-menu");
  const close = () => {
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    if (open) nav.querySelector<HTMLAnchorElement>("a")?.focus();
  });
  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      close();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    )
      close();
  });
  document.addEventListener("focusin", (event) => {
    if (
      event.target instanceof Node &&
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    )
      close();
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", close);
}

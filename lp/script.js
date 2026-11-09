(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
  };
  menu.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(expanded));
    menu.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
    navigation.classList.toggle("is-open", expanded);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menu.focus();
    }
  });
  window.matchMedia("(max-width: 760px)").addEventListener("change", closeMenu);

  const features = [...document.querySelectorAll(".feature-item")];
  const panels = [...document.querySelectorAll(".feature-panel")];
  const selectFeature = (selected) => {
    features.forEach((feature, index) => {
      feature.open = index === selected;
      panels[index].hidden = index !== selected;
    });
  };
  features.forEach((feature, index) => {
    const summary = feature.querySelector("summary");
    summary.setAttribute("aria-controls", panels[index].id);
    summary.id = `feature-label-${index}`;
    panels[index].setAttribute("role", "region");
    panels[index].setAttribute("aria-labelledby", summary.id);
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      selectFeature(index);
    });
  });
})();

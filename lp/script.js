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

  // Motion is progressive enhancement; unsupported browsers keep visible content.
  if (!("IntersectionObserver" in window)) return;

  const root = document.documentElement;
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const reveals = [];
  const prepareReveal = (element, direction = "up", delay = 0) => {
    element.classList.add("motion-reveal");
    element.dataset.reveal = direction;
    element.style.setProperty("--motion-delay", `${delay}ms`);
    reveals.push(element);
  };
  document.querySelectorAll(".hero-copy > *").forEach((element, index) => {
    prepareReveal(element, "up", index * 100);
  });
  prepareReveal(document.querySelector(".photo-frame"), "right", 100);
  prepareReveal(document.querySelector(".appointment-card"), "up", 320);
  prepareReveal(document.querySelector(".hero-chat"), "up", 490);
  document.querySelectorAll(".section-heading").forEach((element) => {
    prepareReveal(element, "down");
  });
  features.forEach((element, index) =>
    prepareReveal(element, "up", index * 55),
  );
  prepareReveal(document.querySelector(".feature-stage"), "up", 120);
  document.querySelectorAll(".quote-card").forEach((element, index) => {
    prepareReveal(element, "up", index * 130);
  });
  document.querySelectorAll(".detail-row").forEach((row) => {
    prepareReveal(row.querySelector(".detail-copy"));
    prepareReveal(row.querySelector(".detail-visual"), "up", 120);
  });
  document
    .querySelectorAll(
      ".section-action, .faq-intro, .faq-list, .closing-inner > *, .footer-top > *",
    )
    .forEach((element) => prepareReveal(element));

  const reveal = (element) => element.classList.add("is-visible");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
  );

  const syncMotion = () => {
    observer.disconnect();
    root.classList.toggle("motion-enabled", !motionPreference.matches);
    if (motionPreference.matches) {
      reveals.forEach(reveal);
      return;
    }
    reveals
      .filter((element) => !element.classList.contains("is-visible"))
      .forEach((element) => observer.observe(element));
  };
  syncMotion();
  motionPreference.addEventListener("change", syncMotion);

  // Keyboard navigation must never leave a focused control visually hidden.
  document.addEventListener("focusin", (event) => {
    const element = event.target.closest(".motion-reveal");
    if (element) {
      reveal(element);
      observer.unobserve(element);
    }
  });

  const header = document.querySelector(".site-header");
  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("has-scrolled", !entry.isIntersecting);
    },
    { rootMargin: "-90px 0px 0px 0px" },
  );
  headerObserver.observe(document.querySelector(".hero"));
})();

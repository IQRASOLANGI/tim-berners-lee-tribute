(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Portrait fallback: if the photo is missing, show the bundled illustration
  var img = document.getElementById("portrait-img");
  if (img) {
    var useFallback = function () {
      if (img.dataset.fallback) return;
      img.dataset.fallback = "true";
      img.src = "assets/portrait-placeholder.svg";
      img.alt = "Placeholder illustration for a portrait of Sir Tim Berners-Lee";
    };
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  }

  // Mobile navigation menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("open", open);
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Scroll reveal. Content is never hidden from keyboard, hash or print users.
  var items = document.querySelectorAll(".reveal");
  var showAll = function () {
    items.forEach(function (el) { el.classList.add("visible"); });
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { revealer.observe(el); });

    // Reveal a whole section when focus moves into it or a link jumps to it
    var revealSection = function (node) {
      var section = node && node.closest ? node.closest("section") : null;
      if (!section) return;
      section.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    };
    document.addEventListener("focusin", function (e) { revealSection(e.target); });
    window.addEventListener("hashchange", function () {
      revealSection(document.getElementById(location.hash.slice(1)));
    });
    if (location.hash) revealSection(document.getElementById(location.hash.slice(1)));

    // Safety net: if the observer never fires, show the content anyway
    window.setTimeout(function () {
      if (document.querySelector(".js .reveal:not(.visible)") && !document.hidden) {
        var vh = window.innerHeight;
        items.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) el.classList.add("visible");
        });
      }
    }, 1500);
  }

  // Highlight the current section in the navigation
  var links = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = map[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }
})();

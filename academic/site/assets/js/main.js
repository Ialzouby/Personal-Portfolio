/* =============================================================================
   Shared behaviour: theme, navigation, scroll reveals, counters, filters.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  function setTheme(name) {
    root.setAttribute("data-theme", name);
    try { localStorage.setItem("theme", name); } catch (e) {}
    if (toggle) toggle.setAttribute("aria-label", "Switch to " + (name === "dark" ? "light" : "dark") + " theme");
    document.dispatchEvent(new CustomEvent("themechange", { detail: name }));
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- rotating role text ---------- */
  var roleEl = document.querySelector("[data-typewriter]");
  if (roleEl) {
    var words = (roleEl.getAttribute("data-typewriter") || "").split("|").filter(Boolean);
    var out = roleEl.querySelector(".tw-text");

    if (!words.length || !out) {
      /* nothing to animate */
    } else if (reduced) {
      out.textContent = words[0];
    } else {
      var wordIdx = 0, charIdx = 0, deleting = false;
      var tick = function () {
        var word = words[wordIdx];
        charIdx += deleting ? -1 : 1;
        out.textContent = word.slice(0, charIdx);

        var delay = deleting ? 40 : 78;
        if (!deleting && charIdx === word.length) {
          delay = 1900;
          deleting = true;
        } else if (deleting && charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          delay = 320;
        }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 600);
    }
  }

  /* ---------- count-up stats ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          countObserver.unobserve(el);

          var target = parseInt(el.getAttribute("data-count"), 10) || 0;
          var suffix = el.getAttribute("data-suffix") || "";
          var duration = 1400;
          var t0 = performance.now();

          var step = function (now) {
            var progress = Math.min(1, (now - t0) / duration);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------- project filters ---------- */
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
    var countEl = document.querySelector("[data-filter-count]");

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;

      filterBar.querySelectorAll(".filter").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });

      var want = btn.getAttribute("data-filter");
      var shown = 0;
      items.forEach(function (item) {
        var match = want === "all" || item.getAttribute("data-category") === want;
        item.hidden = !match;
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown;
    });
  }

  /* ---------- current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

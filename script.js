/* =========================================
   script.js — Portfolio enhancements
   ========================================= */

// Safe year injection
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -----------------------------------------
   HAMBURGER MENU (with X animation)
   ----------------------------------------- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  mobileNav.style.display = "none";
  mobileNav.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("is-open");
}

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "block";
    if (isOpen) {
      closeMobileNav();
    } else {
      mobileNav.style.display = "block";
      mobileNav.setAttribute("aria-hidden", "false");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.classList.add("is-open");
    }
  });

  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeMobileNav());
  });
}

/* -----------------------------------------
   CERTIFICATE MODAL
   ----------------------------------------- */
(function () {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  if (!modal || !modalImg) return;

  const openBtns = document.querySelectorAll(".cert__open");

  function openModal(src) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalImg.src = src;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.removeAttribute("src");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const full = btn.getAttribute("data-full");
      if (full) openModal(full);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target && e.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();

/* -----------------------------------------
   PROJECT CARD CLICK-THROUGH
   ----------------------------------------- */
(function () {
  const cards = document.querySelectorAll(".project--clickable[data-href]");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      const href = card.getAttribute("data-href");
      if (href) window.location.href = href;
    });

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const href = card.getAttribute("data-href");
        if (href) window.location.href = href;
      }
    });
  });
})();

/* -----------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ----------------------------------------- */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  reveals.forEach((el) => observer.observe(el));
})();

/* -----------------------------------------
   ACTIVE NAV HIGHLIGHTING
   ----------------------------------------- */
(function () {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const links = nav.querySelectorAll("a[href^='#']");
  const sections = [];

  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  if (!sections.length) return;

  function updateActive() {
    const scrollY = window.scrollY + 120; // offset for sticky header

    let current = null;
    for (const { link, section } of sections) {
      if (section.offsetTop <= scrollY) {
        current = link;
      }
    }

    links.forEach((l) => l.classList.remove("active"));
    if (current) current.classList.add("active");
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive(); // run on load
})();

/* -----------------------------------------
   BACK TO TOP BUTTON
   ----------------------------------------- */
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  function toggleVisibility() {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* -----------------------------------------
   HEADER SHADOW ON SCROLL
   ----------------------------------------- */
(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 4px 30px rgba(0,0,0,.35)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();

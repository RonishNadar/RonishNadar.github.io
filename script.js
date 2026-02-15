const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  mobileNav.style.display = "none";
  mobileNav.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "block";
  if (isOpen) closeMobileNav();
  else {
    mobileNav.style.display = "block";
    mobileNav.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
  }
});

mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => closeMobileNav());
});

// Certificate preview modal
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

// Make project cards clickable (go to About page)
(function () {
  const cards = document.querySelectorAll(".project--clickable[data-href]");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Allow normal clicks on links/buttons inside the card
      if (e.target.closest("a, button")) return;

      const href = card.getAttribute("data-href");
      if (href) window.location.href = href;
    });

    // Keyboard support
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

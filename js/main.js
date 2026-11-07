/* ==========================================================================
   THVNVTOS — one page
   ========================================================================== */

/* --------------------------------------------------------------------------
   FECHAS / EVENTOS
   Agregá los shows acá. Ejemplo:

   const EVENTS = [
     {
       fecha: "2026-12-12",          // AAAA-MM-DD
       ciudad: "Santiago de Chile",
       recinto: "Sala Arena",
       tickets: "https://..."         // link de venta; "" = botón "Próximamente"
     },
     {
       fecha: "2027-01-30",
       ciudad: "Valparaíso",
       recinto: "Club La Barra",
       tickets: ""
     }
   ];
   -------------------------------------------------------------------------- */
const EVENTS = [];

/* ---------- Header: estado al hacer scroll ---------- */
const header = document.getElementById("site-header");

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

/* ---------- Nav activa según sección visible ---------- */
const navLinks = [...document.querySelectorAll(".nav__list a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Fechas ---------- */
const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic"
];

const eventsRoot = document.getElementById("events");

function renderEvents() {
  if (!EVENTS.length) return; // se mantiene el estado vacío del HTML

  eventsRoot.innerHTML = EVENTS.map((ev) => {
    const date = new Date(`${ev.fecha}T12:00:00`);
    if (Number.isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = MONTHS_ES[date.getMonth()];
    const year = date.getFullYear();

    const hasTickets = Boolean(ev.tickets && ev.tickets.trim());
    const cta = hasTickets
      ? `<a class="btn btn--solid event__cta" href="${ev.tickets}" target="_blank" rel="noopener">Comprar entradas</a>`
      : `<span class="btn btn--ghost event__cta event__cta--disabled" aria-disabled="true">Entradas próximamente</span>`;

    return `
      <article class="event">
        <div class="event__date">
          <span class="event__day">${day}</span>
          <span class="event__month">${month} ${year}</span>
        </div>
        <div class="event__info">
          <h3>${ev.ciudad}</h3>
          <p class="event__meta">${ev.recinto}</p>
        </div>
        ${cta}
      </article>
    `;
  }).join("");
}

renderEvents();

/* ---------- Lightbox del portafolio ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const galleryItems = [...document.querySelectorAll(".gallery__item")];

let lastFocused = null;

function openLightbox(item) {
  lastFocused = item;
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.querySelector("img")?.alt || "";
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    lastFocused?.focus();
  }, 350);
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* ---------- Año del footer ---------- */
document.getElementById("year").textContent = String(new Date().getFullYear());

/* ---------- Glitch del hero: ráfagas aleatorias ---------- */
const hero = document.querySelector(".hero");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function scheduleGlitch() {
  if (reducedMotion.matches || !hero) return;

  const wait = 4000 + Math.random() * 5000; // 4–9 s entre ráfagas
  setTimeout(() => {
    if (reducedMotion.matches) return;
    const duration = 350 + Math.random() * 300; // 350–650 ms de duración
    hero.classList.add("is-glitching");
    setTimeout(() => {
      hero.classList.remove("is-glitching");
      scheduleGlitch();
    }, duration);
  }, wait);
}

scheduleGlitch();

reducedMotion.addEventListener("change", (e) => {
  if (e.matches) hero?.classList.remove("is-glitching");
});

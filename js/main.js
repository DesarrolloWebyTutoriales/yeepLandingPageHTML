// Sustituye este valor por el número real de Samuel, con código de país y sin + ni espacios.
// Ejemplo de formato: 519XXXXXXXX
const WHATSAPP_NUMBER = "51986411473";
const WHATSAPP_MESSAGE = "Hola, Samuel. Quisiera recibir información sobre tus clases de inglés.";

document.querySelectorAll("[data-whatsapp]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    if (WHATSAPP_NUMBER.includes("X")) {
      alert("Configura el número real de WhatsApp en la constante WHATSAPP_NUMBER.");
      return;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Animación de entrada al desplazarse.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Actualiza el enlace activo según la sección visible.
const navLinks = document.querySelectorAll("#mainNav .nav-link");
const trackedSections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const currentHash = `#${entry.target.id}`;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === currentHash;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-32% 0px -58% 0px", threshold: 0 });
trackedSections.forEach((section) => sectionObserver.observe(section));

// Al pulsar un enlace, aplica el estado activo inmediatamente y cierra el menú móvil.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
    const menu = document.getElementById("mainNav");
    if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
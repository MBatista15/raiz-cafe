"use strict";

/* =====================================================================
   RAIZ CAFÉ — SCRIPT PRINCIPAL
   Sumário:
   1. Ano atual no rodapé
   2. Medidor de torra/intensidade (preenchimento dinâmico)
   3. Menu mobile (abrir/fechar)
   4. Rolagem suave com compensação do cabeçalho fixo
   5. Cabeçalho: estado "rolado" + botão voltar ao topo
   6. Link de navegação ativo conforme a seção visível
   7. Animações de revelação ao rolar (reveal on scroll)
   8. Filtro do cardápio (todos / quentes / frios)
   9. Galeria com lightbox
   10. Carrossel de depoimentos
   11. Validação do formulário de contato
   12. Validação do formulário de newsletter
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. ANO ATUAL NO RODAPÉ ---------- */
  const anoAtualEl = document.getElementById("anoAtual");
  if (anoAtualEl) {
    anoAtualEl.textContent = new Date().getFullYear();
  }

  /* ---------- 2. MEDIDOR DE TORRA / INTENSIDADE ---------- */
  // Cada .roast-gauge tem um atributo data-level (1 a 5) que define
  // quantos dos 5 traços internos devem aparecer preenchidos.
  document.querySelectorAll(".roast-gauge").forEach((gauge) => {
    const level = parseInt(gauge.dataset.level, 10) || 0;
    const bars = gauge.querySelectorAll("span");
    bars.forEach((bar, index) => {
      if (index < level) bar.classList.add("is-filled");
    });
  });

  /* ---------- 3. MENU MOBILE ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const navOverlay = document.getElementById("navOverlay");

  function openMobileMenu() {
    nav.classList.add("is-open");
    navOverlay.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    nav.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle && navClose && navOverlay) {
    navToggle.addEventListener("click", openMobileMenu);
    navClose.addEventListener("click", closeMobileMenu);
    navOverlay.addEventListener("click", closeMobileMenu);
  }

  /* ---------- 4. ROLAGEM SUAVE COM COMPENSAÇÃO DO CABEÇALHO ---------- */
  const header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.length <= 1) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerOffset = header.offsetHeight + 12;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      closeMobileMenu();
    });
  });

  /* ---------- 5. CABEÇALHO ROLADO + BOTÃO VOLTAR AO TOPO ---------- */
  const backToTop = document.getElementById("backToTop");

  function handleScrollState() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", handleScrollState, { passive: true });
  handleScrollState(); // define o estado correto caso a página já carregue rolada

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 6. LINK DE NAVEGAÇÃO ATIVO CONFORME A SEÇÃO VISÍVEL ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- 7. ANIMAÇÕES DE REVELAÇÃO AO ROLAR ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 8. FILTRO DO CARDÁPIO ---------- */
  const filterButtons = document.querySelectorAll(".menu__filter");
  const menuCards = document.querySelectorAll(".menu-card");
  const menuEmpty = document.getElementById("menuEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      const filter = button.dataset.filter;
      let visibleCount = 0;

      menuCards.forEach((card) => {
        const matches = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount += 1;
      });

      if (menuEmpty) menuEmpty.hidden = visibleCount !== 0;
    });
  });

  /* ---------- 9. GALERIA COM LIGHTBOX ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery__item");

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const fullImage = item.dataset.full;
      const thumb = item.querySelector("img");
      openLightbox(fullImage, thumb ? thumb.alt : "");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeMobileMenu();
    }
  });

  /* ---------- 10. CARROSSEL DE DEPOIMENTOS ---------- */
  const track = document.getElementById("testimonialTrack");
  const dotsWrapper = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (track && dotsWrapper) {
    const cards = track.querySelectorAll(".testimonial-card");
    let currentIndex = 0;
    let autoplayId = null;

    // Cria um botão indicador (dot) para cada depoimento
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Ir para o depoimento ${index + 1}`);
      if (index === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoplay();
      });
      dotsWrapper.appendChild(dot);
    });

    const dots = dotsWrapper.querySelectorAll("button");

    function goToSlide(index) {
      currentIndex = (index + cards.length) % cards.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
    }

    function startAutoplay() {
      autoplayId = setInterval(() => goToSlide(currentIndex + 1), 6000);
    }

    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
        restartAutoplay();
      });
    }

    const sliderWrapper = document.querySelector(".testimonial-slider");
    if (sliderWrapper) {
      sliderWrapper.addEventListener("mouseenter", stopAutoplay);
      sliderWrapper.addEventListener("mouseleave", startAutoplay);
    }

    goToSlide(0);
    startAutoplay();
  }

  /* ---------- 11. VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (!field) return;
    field.closest(".form-field").classList.add("is-invalid");
    if (errorSpan) errorSpan.textContent = message;
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (!field) return;
    field.closest(".form-field").classList.remove("is-invalid");
    if (errorSpan) errorSpan.textContent = "";
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = document.getElementById("nome");
      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");

      ["nome", "email", "mensagem"].forEach(clearFieldError);
      let isValid = true;

      if (nome.value.trim().length < 2) {
        showFieldError("nome", "Digite seu nome completo.");
        isValid = false;
      }

      if (!emailPattern.test(email.value.trim())) {
        showFieldError("email", "Digite um e-mail válido.");
        isValid = false;
      }

      if (mensagem.value.trim().length < 10) {
        showFieldError("mensagem", "Escreva uma mensagem com pelo menos 10 caracteres.");
        isValid = false;
      }

      if (!isValid) {
        formSuccess.hidden = true;
        return;
      }

      // Envio simulado: em um projeto real, aqui entraria a chamada
      // para uma API (fetch) que enviaria os dados para um backend.
      formSuccess.hidden = false;
      contactForm.reset();
    });
  }

  /* ---------- 12. VALIDAÇÃO DO FORMULÁRIO DE NEWSLETTER ---------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterError = document.getElementById("newsletterError");
  const newsletterSuccess = document.getElementById("newsletterSuccess");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailField = document.getElementById("newsletterEmail");

      if (!emailPattern.test(emailField.value.trim())) {
        newsletterError.textContent = "Digite um e-mail válido.";
        newsletterSuccess.hidden = true;
        return;
      }

      newsletterError.textContent = "";
      newsletterSuccess.hidden = false;
      newsletterForm.reset();
    });
  }

});

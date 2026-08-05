"use strict";

const navToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function closeNavigation() {
  if (!navToggle || !primaryNavigation) return;

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNavigation.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

if (navToggle && primaryNavigation) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu",
    );
    primaryNavigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNavigation();
  });
}

document.querySelectorAll("[data-video-thumbnail]").forEach((thumbnail) => {
  const hideBrokenThumbnail = () => {
    if (thumbnail.complete && thumbnail.naturalWidth === 0) {
      thumbnail.hidden = true;
    }
  };

  thumbnail.addEventListener("error", hideBrokenThumbnail);
  hideBrokenThumbnail();
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (window.emailjs) {
  emailjs.init({
    publicKey: "WvmZY4h-HkHU4wTzj",
  });
}

function updateFormStatus(message, state = "") {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");
  if (state) formStatus.classList.add(`is-${state}`);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton.querySelector(".form-submit__label");
    const originalButtonText = submitLabel.textContent;
    const fullName = document.querySelector("#fullNameInput").value.trim();
    const email = document.querySelector("#emailInput").value.trim();
    const message = document.querySelector("#messageInput").value.trim();

    if (!window.emailjs) {
      updateFormStatus(
        "The form could not load. Please email me directly instead.",
        "error",
      );
      return;
    }

    try {
      submitButton.disabled = true;
      submitLabel.textContent = "Sending...";
      updateFormStatus("Sending your message...");

      await emailjs.send("service_ya1txb9", "template_i1fti0g", {
        from_name: fullName,
        from_email: email,
        message,
      });

      contactForm.reset();
      updateFormStatus(
        "Message sent successfully. I’ll get back to you soon.",
        "success",
      );
    } catch (error) {
      updateFormStatus(
        "Your message could not be sent. Please try again or email me directly.",
        "error",
      );
      console.error("EmailJS error:", error);
    } finally {
      submitButton.disabled = false;
      submitLabel.textContent = originalButtonText;
    }
  });
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

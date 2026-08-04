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

const contactForm = document.querySelector("#contact-form");

if (contactForm && window.emailjs) {
  emailjs.init({
    publicKey: "WvmZY4h-HkHU4wTzj",
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    const fullName = document.querySelector("#fullNameInput").value.trim();
    const email = document.querySelector("#emailInput").value.trim();
    const message = document.querySelector("#messageInput").value.trim();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      await emailjs.send("service_ya1txb9", "template_i1fti0g", {
        from_name: fullName,
        from_email: email,
        message,
      });

      contactForm.reset();
      alert("Message sent successfully!");
    } catch (error) {
      alert("Failed to send your message. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

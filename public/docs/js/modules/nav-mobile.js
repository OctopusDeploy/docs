// @ts-check

import { qs } from "./query.js";
import {
  getFocusableElement,
  trapFocusForward,
  trapReverseFocus,
} from "./focus.js";

function addMobileNav() {
  const hamburgerIcon = qs("[data-hamburger-icon]");
  const mobileMenu = qs("[data-mobile-menu]");

  hamburgerIcon.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileMenu(hamburgerIcon, mobileMenu);
  });

  // Listen for escape key to close the menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-active")) {
      closeMobileMenu(mobileMenu, hamburgerIcon);
    }
  });
}

function toggleMobileMenu(icon, mobileMenu) {
  const isOpen = mobileMenu.classList.contains("is-active");
  if (isOpen) {
    closeMobileMenu(mobileMenu, icon);
  } else {
    openMobileMenu(mobileMenu, icon);
  }
}

function openMobileMenu(mobileMenu, icon) {
  icon.classList.add("is-active");
  mobileMenu.classList.add("is-active");
  icon.setAttribute("aria-expanded", "true");

  // Prevent scrolling on the body
  document.body.style.overflow = "hidden";

  const focusableElements = getFocusableElement(mobileMenu);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
    handleFocusTrap(focusableElements, icon);
  }
}

function closeMobileMenu(mobileMenu, icon) {
  icon.classList.remove("is-active");
  mobileMenu.classList.remove("is-active");
  icon.setAttribute("aria-expanded", "false");

  // Re-enable scrolling on the body
  document.body.style.overflow = "";
}

function handleFocusTrap(focusableElements, icon) {
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  firstElement.addEventListener("keydown", (e) =>
    trapReverseFocus(e, lastElement)
  );
  lastElement.addEventListener("keydown", (e) =>
    trapFocusForward(e, firstElement)
  );

  mobileMenu.addEventListener(
    "transitionend",
    () => {
      if (!mobileMenu.classList.contains("is-active")) {
        icon.focus();
      }
    },
    { once: true }
  );
}

export { addMobileNav };

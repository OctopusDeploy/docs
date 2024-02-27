// @ts-check

import { qs, qsa } from "./query.js";
import {
  getFocusableElement,
  trapFocusForward,
  trapReverseFocus,
} from "./focus.js";

const hamburgerIcon = qs("[data-hamburger-icon]");
const mobileMenu = qs("[data-mobile-menu]");
const menuList = qs(".site-nav__list");

function addMobileNav() {
  hamburgerIcon.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileMenu(hamburgerIcon, mobileMenu);
  });

  // Listen for escape key to close the menu
  document.addEventListener("keydown", (e) => {});

  // Menu accessibility controls
  document.addEventListener("keydown", handleDropdownKeyboardNavigation);
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
}

function closeMobileMenu(mobileMenu, icon) {
  icon.classList.remove("is-active");
  mobileMenu.classList.remove("is-active");
  icon.setAttribute("aria-expanded", "false");

  // Re-enable scrolling on the body
  document.body.style.overflow = "";
}

function handleDropdownKeyboardNavigation(e) {
  // Proceed only if search dropdown is active
  if (!mobileMenu.classList.contains("is-active")) return;

  // Listen for escape key to close the menu
  if (e.key === "Escape") {
    closeMobileMenu(mobileMenu, hamburgerIcon);
  }

  if (e.key === "Tab") {
    // setTimeout(() => {
    const menuItems = qsa(".site-nav__list li");
    const firstElement = hamburgerIcon;
    const lastElement = menuItems[menuItems.length - 1].firstChild;

    if (e.shiftKey && document.activeElement === firstElement) {
      // Shift + Tab: Move focus to the last element if the first element is currently focused
      e.preventDefault();
      if (lastElement) lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      // Tab: Move focus to the first element if the last element is currently focused
      e.preventDefault();
      firstElement.focus();
    }
    // }, 0);
  }
}

export { addMobileNav };

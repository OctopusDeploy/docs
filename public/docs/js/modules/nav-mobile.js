// @ts-check
import { qs, qsa } from "./query.js";

class MobileNav {
  constructor() {
    this.mobileMenuWrapper = qs("[data-mobile-menu-wrapper]");
    this.hamburgerIcon = qs("[data-hamburger-icon]");
    this.menuItems = qsa(".site-nav__list li");

    this.addListeners();
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenuWrapper.classList.contains("is-active");
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenuWrapper.classList.add("is-active");
    this.hamburgerIcon.setAttribute("aria-expanded", "true");
    // Prevent scrolling on the body
    document.body.style.overflow = "hidden";
  }

  closeMobileMenu() {
    this.mobileMenuWrapper.classList.remove("is-active");
    this.hamburgerIcon.setAttribute("aria-expanded", "false");
    // Re-enable scrolling on the body
    document.body.style.overflow = "";
  }

  handleDropdownKeyboardNavigation(e) {
    if (!this.mobileMenuWrapper.classList.contains("is-active")) return;
    if (e.key === "Escape") {
      this.closeMobileMenu();
    }

    if (e.key === "Tab") {
      const firstElement = this.hamburgerIcon;
      const lastElement = this.menuItems[this.menuItems.length - 1].firstChild;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  addListeners() {
    this.hamburgerIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    document.addEventListener("keydown", (e) =>
      this.handleDropdownKeyboardNavigation(e)
    );
  }
}

const mobileNav = new MobileNav();
export { mobileNav };

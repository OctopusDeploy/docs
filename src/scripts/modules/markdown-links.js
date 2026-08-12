// @ts-check
import { qs, qsa } from './query.js';

class MarkdownLinks {
  constructor(menu) {
    this.menu = menu;
    this.trigger = qs('[data-md-links-trigger]', menu);

    this.addListeners();
  }

  handleKeyboardNavigation(e) {
    if (!this.menu.open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.menu.open = false;
      this.trigger.focus();
    }
  }

  handleOutsideClick(e) {
    if (!this.menu.open) return;
    if (e.target instanceof Node && this.menu.contains(e.target)) return;
    this.menu.open = false;
  }

  addListeners() {
    this.menu.addEventListener('keydown', (e) =>
      this.handleKeyboardNavigation(e)
    );

    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }
}

const markdownLinkMenus = Array.from(qsa('[data-md-links-menu]')).map(
  (menu) => new MarkdownLinks(menu)
);

export { markdownLinkMenus };

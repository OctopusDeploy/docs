class ThemeSwitcher {
  constructor() {
    this.toggle = document.querySelector('[data-theme-toggle]');
    if (!this.toggle) {
      throw new Error('Toggle switch not found!');
    }
    this.body = document.body;
    this.init();
  }

  init() {
    // Initialize theme based on stored preference or system preference
    const preferredTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    this.body.setAttribute('data-theme', preferredTheme);
    this.toggle.checked = preferredTheme === 'dark';
    this.toggle.setAttribute('aria-checked', this.toggle.checked.toString());

    this.addEventListeners();
  }

  addEventListeners() {
    this.toggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const newTheme =
      this.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    this.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.toggle.setAttribute('aria-checked', this.toggle.checked.toString());
  }
}

export { ThemeSwitcher };

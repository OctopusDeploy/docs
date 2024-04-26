class ThemeSwitcher {
  constructor() {
    this.themeSwitcher = document.querySelector('[data-theme-toggle]');
    this.checkbox = this.themeSwitcher.querySelector(
      '[data-theme-toggle-checkbox]'
    );
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
    this.checkbox.checked = preferredTheme === 'dark';
    this.checkbox.setAttribute(
      'aria-checked',
      this.checkbox.checked.toString()
    );

    this.addEventListeners();
  }

  addEventListeners() {
    this.themeSwitcher.addEventListener('click', (e) => {
      if (e.target === this.checkbox) {
        this.toggleTheme();
      }
    });
    // Handle keydown event for keyboard accessibility
    this.themeSwitcher.addEventListener('keydown', (e) => {
      // Enter or Space key
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const newTheme =
      this.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    // Toggle the checked state of the checkbox - keyboard fallback
    this.checkbox.checked = newTheme === 'dark';
    this.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.checkbox.setAttribute(
      'aria-checked',
      this.checkbox.checked.toString()
    );
  }
}

export { ThemeSwitcher };

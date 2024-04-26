class ThemeSwitcher {
  constructor(el) {
    this.themeSwitcher = el;
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
    this.updateCheckboxAndClass(preferredTheme === 'dark');

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
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const isDarkMode = this.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDarkMode ? 'light' : 'dark';
    this.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateCheckboxAndClass(!isDarkMode);
  }

  updateCheckboxAndClass(isDarkMode) {
    this.checkbox.checked = isDarkMode;
    this.checkbox.setAttribute('aria-checked', isDarkMode.toString());
    if (isDarkMode) {
      this.themeSwitcher.classList.add('dark-mode');
    } else {
      this.themeSwitcher.classList.remove('dark-mode');
    }
  }
}

export { ThemeSwitcher };

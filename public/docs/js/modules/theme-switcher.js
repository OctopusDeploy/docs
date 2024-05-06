class ThemeSwitcher {
  constructor(el) {
    this.themeSwitcher = el;
    this.checkbox = this.themeSwitcher.querySelector(
      '[data-theme-toggle-checkbox]'
    );
    this.html = document.documentElement;
    this.isDarkMode = this.html.getAttribute('data-theme') === 'dark';

    this.syncCheckboxWithTheme();
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
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    this.html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    this.syncCheckboxWithTheme();
  }

  syncCheckboxWithTheme() {
    this.checkbox.checked = this.isDarkMode;
    this.checkbox.setAttribute('aria-checked', this.isDarkMode.toString());
    if (this.isDarkMode) {
      this.themeSwitcher.classList.add('dark-mode');
    } else {
      this.themeSwitcher.classList.remove('dark-mode');
    }
  }
}

export { ThemeSwitcher };

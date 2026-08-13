import {
  COLOR_SCHEME_QUERY,
  isTheme,
  THEME_ATTRIBUTE,
  THEME_CHANGE_EVENT,
  THEME_PREFERENCE_ATTRIBUTE,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_ATTRIBUTE,
  type Theme,
  type ThemePreference,
} from '../lib/theme';

// Matches --duration-default in vars.css.
const TRANSITION_MS = 300;

const CHECKBOX_SELECTOR = '[data-theme-toggle-checkbox]';

const BUTTON_SELECTOR = '[data-theme-toggle-button]';
const BUTTON_ICON_SELECTOR = '.btn__icon';

const BUTTON_ICON_CLASSES: Record<Theme, string> = {
  light: 'theme-switcher__moon_icon',
  dark: 'theme-switcher__sun_icon',
};

const root = document.documentElement;
const darkQuery = window.matchMedia(COLOR_SCHEME_QUERY);

function checkboxes() {
  return document.querySelectorAll<HTMLInputElement>(CHECKBOX_SELECTOR);
}

function buttons() {
  return document.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR);
}

// localStorage throws in Safari private mode and in cookie-blocked iframes.
// A failed read or write only costs persistence, so swallow it.
function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

function writePreference(preference: ThemePreference) {
  try {
    if (preference === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    /* not persisted */
  }
}

function resolve(preference: ThemePreference): Theme {
  if (preference !== 'system') return preference;
  return darkQuery.matches ? 'dark' : 'light';
}

function currentTheme(): Theme {
  return root.getAttribute(THEME_ATTRIBUTE) === 'dark' ? 'dark' : 'light';
}

function syncControls(theme: Theme) {
  checkboxes().forEach((box) => {
    box.checked = theme === 'dark';
  });

  buttons().forEach((button) => {
    const icon = button.querySelector(BUTTON_ICON_SELECTOR);
    icon?.classList.remove(
      BUTTON_ICON_CLASSES[theme === 'dark' ? 'light' : 'dark']
    );
    icon?.classList.add(BUTTON_ICON_CLASSES[theme]);
  });
}

let transitionTimer: ReturnType<typeof setTimeout> | undefined;

function markTransition() {
  root.setAttribute(THEME_TRANSITION_ATTRIBUTE, '');
  clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    root.removeAttribute(THEME_TRANSITION_ATTRIBUTE);
    transitionTimer = undefined;
  }, TRANSITION_MS);
}

function apply(preference: ThemePreference) {
  const theme = resolve(preference);
  if (theme !== currentTheme()) markTransition();
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.setAttribute(THEME_PREFERENCE_ATTRIBUTE, preference);
  syncControls(theme);
  root.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme, preference } })
  );
}

/** Set and persist the theme. Pass 'system' to hand control back to the OS. */
export function setTheme(preference: ThemePreference) {
  writePreference(preference);
  apply(preference);
}

export function getTheme(): Theme {
  return currentTheme();
}

function bind() {
  // The inline head script already set the attribute; mirror it onto every
  // control rather than re-deriving it, so all switchers agree from paint one.
  syncControls(currentTheme());

  checkboxes().forEach((box) => {
    if (box.dataset.themeBound) return;
    box.dataset.themeBound = 'true';

    // Covers mouse, touch, label clicks and Space.
    box.addEventListener('change', () =>
      setTheme(box.checked ? 'dark' : 'light')
    );

    // A checkbox ignores Enter. The switch role treats it as an optional
    // second activation key, and this control supported it before. Routed
    // through click() so the change handler stays the only writer of state.
    box.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      box.click();
    });
  });

  buttons().forEach((button) => {
    if (button.dataset.themeBound) return;
    button.dataset.themeBound = 'true';

    button.addEventListener('click', () =>
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark')
    );
  });
}

// Follow the OS only while the user has not made an explicit choice.
darkQuery.addEventListener('change', () => {
  if (readPreference() === 'system') apply('system');
});

// Keep other tabs in step.
window.addEventListener('storage', (event) => {
  if (event.key === THEME_STORAGE_KEY || event.key === null) {
    apply(readPreference());
  }
});

bind();

// No-op today (this is an MPA), but keeps the switcher working if <ClientRouter />
// is ever added, since a swap replaces <html> attributes and the controls.
document.addEventListener('astro:after-swap', () => {
  apply(readPreference());
  bind();
});

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

const BUTTON_SELECTOR = '[data-theme-toggle-button]';

const root = document.documentElement;
const darkQuery = window.matchMedia(COLOR_SCHEME_QUERY);

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

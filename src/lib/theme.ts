/**
 * Shared contract for theme handling. These names are used by the pre-paint
 * inline script (ThemeScript.astro), the client controller
 * (src/scripts/theme-switcher.ts) and the stylesheets, so they live in one
 * place to stop the three drifting apart.
 *
 * `data-theme` on <html> is always exactly 'light' or 'dark' - never absent,
 * never 'system'. Design token stylesheets can therefore key off
 * [data-theme='light'] and [data-theme='dark'] with no :root fallback needed.
 *
 * `data-theme-preference` records what the user actually chose, including
 * 'system'. Nothing styles off it today; it exists so a future three-state
 * control can render the right position.
 */

export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const THEME_PREFERENCE_ATTRIBUTE = 'data-theme-preference';
export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/** Fired on <html> after the theme changes. detail: { theme, preference } */
export const THEME_CHANGE_EVENT = 'theme:change';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

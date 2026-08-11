/**
 * Shared contract for theme handling. These names are used by the pre-paint
 * inline script (ThemeScript.astro), the client controller
 * (src/scripts/theme-switcher.ts) and the stylesheets, so they live in one
 * place to stop the three drifting apart.
 *
 * `data-theme` on <html> is always exactly 'light' or 'dark' - never absent,
 * never 'system'. The design token stylesheets key off [data-theme='light'] and
 * [data-theme='dark'] and define nothing at :root, so the attribute has to be
 * there unconditionally: layouts/Default.astro renders 'light' as the server
 * default, and ThemeScript.astro resolves the real value before first paint.
 * With scripting disabled the default stands and the tokens still resolve.
 *
 * This holds for anything rendered through layouts/Default.astro; the
 * src/pages/report/*.astro pages build their own <html> and sit outside it.
 *
 * `data-theme-preference` records what the user actually chose, including
 * 'system'. Nothing styles off it today; it exists so a future three-state
 * control can render the right position.
 */

export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const THEME_PREFERENCE_ATTRIBUTE = 'data-theme-preference';
export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * Fired on <html> after the theme changes. detail: { theme, preference }
 *
 * Does not fire at boot - the pre-paint script sets the attribute directly.
 * Read `data-theme` for the current value and listen for later changes.
 */
export const THEME_CHANGE_EVENT = 'theme:change';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

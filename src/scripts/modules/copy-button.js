// @ts-check

// Shared by the heading copy-URL button and the code block copy button. Both
// swap their tooltip to a result, revert after a beat, and announce it.
// `announce` is also used by the "Copy as markdown" page action, which shows
// its result in a label rather than a tooltip.

const REVERT_MS = 2000;

const COPIED = 'Copied';
const FAILED = 'Copy failed';

/** @type {WeakMap<HTMLElement, ReturnType<typeof setTimeout>>} */
const timers = new WeakMap();

/** @type {WeakMap<HTMLElement, string>} */
const restLabels = new WeakMap();

/** @type {HTMLElement | null} */
let status = null;

/**
 * A button's own data-tooltip is its resting label, captured before the first
 * result overwrites it.
 *
 * @param {HTMLElement} button
 */
function restLabel(button) {
  if (!restLabels.has(button)) {
    restLabels.set(button, button.dataset.tooltip ?? '');
  }
  return restLabels.get(button) ?? '';
}

/**
 * @param {HTMLElement} button
 * @param {string} message
 */
function showResult(button, message) {
  const rest = restLabel(button);

  button.dataset.tooltip = message;
  button.dataset.copied = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      button.dataset.tooltip = rest;
      delete button.dataset.copied;
      timers.delete(button);
    }, REVERT_MS)
  );
}

/**
 * One region for the whole page, on the body so it cannot land inside a
 * heading's accessible name.
 *
 * @param {string} message
 */
function announce(message) {
  if (!status) {
    status = document.createElement('div');
    status.className = 'copy-status';
    status.setAttribute('aria-live', 'polite');
    document.body.append(status);
  }

  // Cleared first, then set on a later task, so copying twice in a row reads as
  // a change and is announced both times.
  const region = status;
  region.textContent = '';
  setTimeout(() => {
    region.textContent = message;
  }, 50);
}

/**
 * Delegated, so it covers buttons that are rendered at build time as well as
 * ones a module adds later.
 *
 * @param {string} selector
 * @param {(button: HTMLElement) => string | null} read the text to copy. Must
 *   return synchronously: Safari spends the click's user activation on the
 *   first await, and the clipboard write then fails.
 */
function copyOnClick(selector, read) {
  document.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest(selector);
    if (!(button instanceof HTMLElement)) return;

    const value = read(button);
    if (value === null) return;

    let message = COPIED;
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.warn('[copy-button] clipboard write failed', error);
      message = FAILED;
    }

    showResult(button, message);
    announce(message);
  });
}

export { announce, copyOnClick, REVERT_MS };

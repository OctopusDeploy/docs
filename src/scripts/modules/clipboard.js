// @ts-check

// The one clipboard writer on the site. Three buttons share it: the heading
// copy-URL button, the code block copy button, and the "Copy as markdown" page
// action. They differ in what they read and in how they report the result, so
// those are the two things a caller supplies. The write itself is the same
// problem every time, and it is the part browsers disagree about.

const REVERT_MS = 2000;

// Matches the tooltip's hide transition in main.css.
const FADE_MS = 375;

const COPIED = 'Copied';
const FAILED = 'Copy failed';

/** @type {WeakMap<HTMLElement, ReturnType<typeof setTimeout>>} */
const timers = new WeakMap();

/** @type {WeakMap<HTMLElement, string>} */
const restLabels = new WeakMap();

/** @type {HTMLElement | null} */
let status = null;

/**
 * Runs `restore` once the result has been on screen long enough to read. A
 * second copy before then replaces the pending revert rather than stacking one.
 *
 * A button holds one timer, cleared before `restore` runs so that a `restore`
 * scheduling its own follow-up keeps that follow-up cancellable too.
 *
 * @param {HTMLElement} button
 * @param {() => void} restore
 * @param {number} [delay]
 */
function revertAfter(button, restore, delay = REVERT_MS) {
  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      timers.delete(button);
      restore();
    }, delay)
  );
}

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
 * The default reporter, for an icon-only button that carries its label in a
 * tooltip bubble. Returns the message so the caller announces what is on
 * screen rather than a second guess at it.
 *
 * @param {HTMLElement} button
 * @param {boolean} ok
 * @returns {string}
 */
function showTooltipResult(button, ok) {
  const message = ok ? COPIED : FAILED;
  const rest = restLabel(button);

  const clearState = () => {
    delete button.dataset.copied;
    delete button.dataset.failed;
  };

  clearState();
  button.dataset.tooltip = message;
  button.dataset[ok ? 'copied' : 'failed'] = '';

  revertAfter(button, () => {
    clearState();

    // Dropping the attribute starts the bubble fading, and swapping the label
    // underneath it would be visible for as long as that runs. A pointer or
    // focus still on the button holds the bubble open instead, so there is no
    // fade to wait out and the resting label is wanted now.
    if (button.matches(':hover, :focus-visible')) {
      button.dataset.tooltip = rest;
      return;
    }

    revertAfter(button, () => (button.dataset.tooltip = rest), FADE_MS);
  });

  return message;
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
 * The last resort, for pages served over http where navigator.clipboard does
 * not exist. Needs the click's user activation just as the async API does.
 *
 * @param {string} text
 */
function execCommandCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.append(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    console.warn('[clipboard] execCommand fallback threw', error);
    copied = false;
  }
  textarea.remove();

  return copied;
}

/**
 * Safari gives a click one shot at the clipboard and spends it on the first
 * await, so a value that still has to be fetched cannot be handed over as a
 * resolved string. `write` takes a promise for exactly this: the gesture stays
 * alive while the value settles. `writeText` covers browsers without
 * ClipboardItem, and execCommand covers insecure contexts.
 *
 * @param {string | Promise<string>} value
 * @returns {Promise<boolean>}
 */
async function writeToClipboard(value) {
  const clipboard = navigator.clipboard;
  const secure = window.isSecureContext !== false;

  if (
    secure &&
    clipboard &&
    typeof clipboard.write === 'function' &&
    typeof ClipboardItem === 'function'
  ) {
    try {
      const blob = Promise.resolve(value).then(
        (text) => new Blob([text], { type: 'text/plain' })
      );
      await clipboard.write([new ClipboardItem({ 'text/plain': blob })]);
      return true;
    } catch (error) {
      console.warn('[clipboard] clipboard.write failed, falling back', error);
    }
  }

  // Awaited only now: doing it earlier would burn the user activation before
  // the branch above ever got the chance to use it.
  const text = await value;

  if (secure && clipboard && typeof clipboard.writeText === 'function') {
    try {
      await clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('[clipboard] writeText failed, falling back', error);
    }
  }

  return execCommandCopy(text);
}

/**
 * Delegated, so it covers buttons that are rendered at build time as well as
 * ones a module adds later.
 *
 * @param {string} selector
 * @param {(button: HTMLElement) => string | Promise<string> | null} read the
 *   text to copy, or a promise for it. Returning null means this click is not
 *   a copy after all.
 * @param {{ show?: (button: HTMLElement, ok: boolean) => string }} [options]
 *   `show` puts the result on the button and returns the message to announce.
 */
function copyOnClick(selector, read, options = {}) {
  const show = options.show ?? showTooltipResult;

  document.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest(selector);
    if (!(button instanceof HTMLElement)) return;

    const value = read(button);
    if (value === null) return;

    let ok = false;
    try {
      ok = await writeToClipboard(value);
    } catch (error) {
      console.warn('[clipboard] copy failed', error);
    }

    announce(show(button, ok));
  });
}

export { copyOnClick, revertAfter };

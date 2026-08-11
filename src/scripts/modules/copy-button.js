// @ts-check

// Shared by the heading copy-URL button, the code block copy button and the
// page action that copies the page as markdown. All swap to a result, revert
// after a beat, and announce it.
//
// One module rather than one per button, because `status` below is the page's
// only live region. Split this up and a page grows a second announcer, which
// screen readers treat as a separate status to track.

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
 * A labelled button shows the result in its label, an icon-only one in its
 * tooltip. Captured before the first result overwrites it.
 *
 * @param {HTMLElement} button
 * @param {Element | null} label
 */
function restLabel(button, label) {
  if (!restLabels.has(button)) {
    restLabels.set(
      button,
      (label ? label.textContent : button.dataset.tooltip) ?? ''
    );
  }
  return restLabels.get(button) ?? '';
}

/**
 * `data-copied` is what swaps the icon, so it is set either way.
 *
 * @param {HTMLElement} button
 * @param {string} message
 */
function showResult(button, message) {
  const label = button.querySelector('.btn__label');
  const rest = restLabel(button, label);

  const write = (/** @type {string} */ text) => {
    if (label) label.textContent = text;
    else button.dataset.tooltip = text;
  };

  // "Copied" is shorter than the resting label, and a button that narrows for
  // two seconds shuffles whatever sits beside it. Measured rather than given a
  // width up front, so it holds for any translation of the label.
  // Fractional, because offsetWidth rounds and the button would still shift by
  // the part of a pixel it dropped.
  if (label) {
    button.style.minWidth = button.getBoundingClientRect().width + 'px';
  }

  write(message);
  button.dataset.copied = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      write(rest);
      delete button.dataset.copied;
      // Released so the next copy measures again, in case the text has since
      // reflowed at a different zoom or font size.
      button.style.minWidth = '';
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
 * @param {(button: HTMLElement) => Promise<void> | null} write starts the
 *   clipboard write, or returns null to let the click through. Called before
 *   the first await, because Safari spends the click's user activation on it
 *   and every clipboard API refuses once that is gone.
 */
function onCopyClick(selector, write) {
  document.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest(selector);
    if (!(button instanceof HTMLElement)) return;

    const pending = write(button);
    if (pending === null) return;

    let message = COPIED;
    try {
      await pending;
    } catch (error) {
      console.warn('[copy-button] copy failed', error);
      message = FAILED;
    }

    showResult(button, message);
    announce(message);
  });
}

/**
 * @param {string} selector
 * @param {(button: HTMLElement) => string | null} read the text to copy, read
 *   off the page and so available synchronously.
 */
function copyOnClick(selector, read) {
  onCopyClick(selector, (button) => {
    const value = read(button);
    return value === null ? null : navigator.clipboard.writeText(value);
  });
}

/**
 * Fetched text cannot use writeText, because awaiting the response first spends
 * the user activation the write needs. Handing ClipboardItem the pending
 * response instead lets the write start now and settle later. writeText is kept
 * for the sync case: it is the simpler call and the better supported one.
 *
 * @param {string} selector
 * @param {(button: HTMLElement) => string | null} readUrl
 */
function copyFetchedOnClick(selector, readUrl) {
  onCopyClick(selector, (button) => {
    const url = readUrl(button);
    if (url === null) return null;

    const text = fetch(url).then((response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.text();
    });

    if (typeof ClipboardItem !== 'function' || !navigator.clipboard.write) {
      return text.then((value) => navigator.clipboard.writeText(value));
    }

    const blob = text.then(
      (value) => new Blob([value], { type: 'text/plain' })
    );
    return navigator.clipboard.write([
      new ClipboardItem({ 'text/plain': blob }),
    ]);
  });
}

export { copyOnClick, copyFetchedOnClick };

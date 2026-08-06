// @ts-check
import { qsa } from './query.js';

const REVERT_MS = 2000;

const REST = 'Copy URL';
const COPIED = 'Copied';
const FAILED = 'Copy failed';

/** @type {HTMLElement | null} */
let status = null;

/** @type {WeakMap<HTMLElement, ReturnType<typeof setTimeout>>} */
const timers = new WeakMap();

/**
 * Scoped to .page-content headings with an id: the feedback prompt and the
 * navigation render their own headings, and those have nothing to link to.
 *
 * Each heading is given an aria-label of its own text. A heading is named from
 * its contents, and those contents include a nested control's name, so without
 * this every heading is announced with the button's label on the end.
 */
function addCopyButtons() {
  qsa('.page-content :is(h2, h3, h4, h5, h6)[id]').forEach((heading) => {
    const headingText = heading.textContent?.trim();
    if (headingText) heading.setAttribute('aria-label', headingText);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-heading-url btn btn--xsmall';
    button.dataset.tooltip = REST;
    button.setAttribute('aria-label', 'Copy link to this section');

    // Empty: the glyph is a CSS mask on the span itself.
    const icon = document.createElement('span');
    icon.className = 'copy-heading-url__icon btn__icon';

    button.appendChild(icon);
    heading.appendChild(button);
  });
}

function addCopyListener() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest('.copy-heading-url');
    if (button instanceof HTMLElement) copyHeadingUrl(button);
  });
}

/**
 * @param {HTMLElement} button
 */
async function copyHeadingUrl(button) {
  const id = button.closest('h2, h3, h4, h5, h6')?.id;
  if (!id) return;

  const url = new URL(window.location.href);
  url.hash = id;

  let message = COPIED;
  try {
    // Nothing may be awaited before this: Safari spends the click's user
    // activation on the first await, and the write then fails.
    await navigator.clipboard.writeText(url.toString());
  } catch (error) {
    console.warn('[headers] clipboard write failed', error);
    message = FAILED;
  }

  showResult(button, message);
  announce(message);
}

/**
 * @param {HTMLElement} button
 * @param {string} message
 */
function showResult(button, message) {
  button.dataset.tooltip = message;
  button.dataset.copied = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      button.dataset.tooltip = REST;
      delete button.dataset.copied;
      timers.delete(button);
    }, REVERT_MS)
  );
}

/**
 * The region is appended to the body rather than the heading, so it cannot end
 * up in a heading's accessible name.
 *
 * @param {string} message
 */
function announce(message) {
  if (!status) {
    status = document.createElement('div');
    status.className = 'copy-heading-url-status';
    status.setAttribute('aria-live', 'polite');
    document.body.append(status);
  }

  // Cleared first, then set on a later task, so copying twice in a row reads as
  // a change and is announced both times. Same as copy-markdown.js.
  const region = status;
  region.textContent = '';
  setTimeout(() => {
    region.textContent = message;
  }, 50);
}

function enhanceHeaders() {
  addCopyButtons();
  addCopyListener();
}

export { enhanceHeaders };

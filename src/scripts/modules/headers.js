// @ts-check
import { qsa } from './query.js';
import { copyOnClick } from './copy-button.js';

const REST = 'Copy URL';

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
    button.className = 'copy-heading-url';
    button.dataset.tooltip = REST;
    button.setAttribute('aria-label', 'Copy link to this section');

    // Empty: the glyph is a CSS mask on the span itself.
    const icon = document.createElement('span');
    icon.className = 'copy-heading-url__icon';

    button.appendChild(icon);
    heading.appendChild(button);
  });
}

/**
 * @param {HTMLElement} button
 */
function headingUrl(button) {
  const id = button.closest('h2, h3, h4, h5, h6')?.id;
  if (!id) return null;

  const url = new URL(window.location.href);
  url.hash = id;
  return url.toString();
}

function enhanceHeaders() {
  addCopyButtons();
  copyOnClick('.copy-heading-url', headingUrl);
}

export { enhanceHeaders };

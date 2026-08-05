import { qsa } from './query.js';

/**
 * Enables copy on code blocks (<pre><code>...)
 */
function enhanceHeaders() {
  // Make code blocks focusable, so they can be keyboard scrolled
  qsa('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach((elem) => {
    const linkContainer = document.createElement('a');
    linkContainer.href = `#${elem.id}`;
    linkContainer.className = 'bookmark-link';
    // The icon is drawn by .bookmark-link::before, so the anchor has no content
    // of its own and takes its accessible name from here.
    linkContainer.setAttribute('aria-label', 'Link to this section');

    elem.appendChild(linkContainer);
  });
}

export { enhanceHeaders };

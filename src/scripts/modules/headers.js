import { qsa } from './query.js';
// LinkOnIcon, path data from @octopusdeploy/design-system-icons
// (src/icons/LinkOnIcon.tsx). The 40x40 viewBox is the icon set's grid - the
// path clips at any other value.
import linkOnIcon from '../../../../src/icons/link-on.svg?raw';

/**
 * Enables copy on code blocks (<pre><code>...)
 */
function enhanceHeaders() {
  // Make code blocks focusable, so they can be keyboard scrolled
  qsa('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach((elem) => {
    const linkContainer = document.createElement('a');
    linkContainer.href = `#${elem.id}`;
    linkContainer.className = 'bookmark-link';
    linkContainer.setAttribute('aria-label', 'Link to this section');
    linkContainer.innerHTML = linkOnIcon;

    elem.appendChild(linkContainer);
  });
}

export { enhanceHeaders };

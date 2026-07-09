// Append a permalink anchor to every h2-h6 that has an id, so readers can grab a
// deep link to a section. The icon is drawn purely in CSS (.bookmark-link, see
// styles/components.css) via a masked SVG, so this carries no icon-font dependency. Clicking it
// copies the section URL to the clipboard and shows a toast, rather than jump-scrolling.
import { showToast, copyToClipboard } from './toast';

export function enhanceHeadingAnchors(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id], h5[id], h6[id]')
    .forEach((heading) => {
      if (heading.querySelector('.bookmark-link')) return; // idempotent
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = 'bookmark-link';
      link.setAttribute('aria-label', 'Copy link to this section');
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        // Reflect the section in the address bar without a scroll jump.
        history.pushState(null, '', `#${heading.id}`);
        const ok = await copyToClipboard(link.href);
        showToast(ok ? 'Link copied' : 'Press ⌘/Ctrl+C to copy', link);
      });
      heading.appendChild(link);
    });
}

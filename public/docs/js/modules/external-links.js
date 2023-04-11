import { qsa } from './query.js';

function setExternalLinkAttributes() {
    // Open external links in a new tab
    qsa('a[href^=http]').forEach((link) => {
        // Open external links in a new tab
        const destination = new URL(link.href);
        if (destination.hostname != window.location.hostname) {
            if (!link.target) {
                link.setAttribute('target', '_blank');
            }

            if (!link.rel) {
                link.setAttribute('rel', 'noopener');
            }
        }
    });
}

export { setExternalLinkAttributes }
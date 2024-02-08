/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qs, qsa } from './query.js';

function handleClick() {

    const title = this.dataset.sharetitle ?? qs('meta[property="og:title"]').content;
    const text = this.dataset.sharetext ?? qs('meta[property="og:description"]').content;
    const url = this.dataset.shareurl ?? document.location;

    const share = {
        title: title,
        text: text,
        url: url
    };

    if (navigator.share) {
        navigator.share(share);
    }
}

function enableSharing() {
    const canShare = !!navigator.share;
    qsa('[data-share]').forEach((elem) => {
        if (canShare) {
            elem.addEventListener('click', handleClick);
        } else {
            elem.style.display = 'none';
        }
    });
}

export { enableSharing }
/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qs, qsa } from './query.js';

const activeClass = 'magnify-icon';

/** 
 * Enables opening image in new tab
*/
function enhanceFigures() {
    qsa(`figure > p > img`).forEach(node => {
        const src = node.src;

        const magnify = document.createElement('button');
        magnify.classList.add(activeClass);
        magnify.title = 'Enlarge';

        const magnifyContainer = document.createElement('div');
        magnifyContainer.className = 'magnify-container';
        magnifyContainer.appendChild(magnify);

        node.insertAdjacentElement('beforebegin', magnifyContainer);

        magnify.addEventListener('click', async () => {
            window.open(src);
        });
    });
}

export { enhanceFigures }
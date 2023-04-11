import { qs, qsa } from './query.js';

const activeClass = 'magnify-icon';

const clipboard = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="15" y1="8" x2="15.01" y2="8" />
  <rect x="4" y="4" width="16" height="16" rx="3" />
  <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
  <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
</svg>`;

/** 
 * Enables copy on code blocks (<pre><code>...)
*/
function enhanceFigures() {
    qsa(`figure > p > img`).forEach(node => {
        const src = node.src;

        const magnify = document.createElement('button');
        magnify.classList.add(activeClass);
        magnify.innerHTML = clipboard;
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
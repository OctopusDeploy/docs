/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qs, qsa } from './query.js';

const activeClass = "copy-button";

const clipboard = `<svg xmlns="http://www.w3.org/2000/svg" title="Copy" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
<rect x="9" y="3" width="6" height="4" rx="2" />
</svg>`;

const clipboardDone = `<svg xmlns="http://www.w3.org/2000/svg" title="Copied" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
<rect x="9" y="3" width="6" height="4" rx="2" />
<path d="M9 14l2 2l4 -4" />
</svg>`;

const clipboardError = `<svg xmlns="http://www.w3.org/2000/svg" title="Cannot copy" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
<rect x="9" y="3" width="6" height="4" rx="2" />
<path d="M10 12l4 4m0 -4l-4 4" />
</svg>`

/** 
 * Enables copy on code blocks (<pre><code>...)
*/
function enhanceCodeBlocks() {

    // Make code blocks focusable, so they can be keyboard scrolled
    qsa('pre.astro-code').forEach((elem) => elem.setAttribute('tabindex', '0'));

    qsa(`pre:not(.${activeClass})`).forEach(node => {
        const copy = document.createElement('button');
        copy.classList.add(activeClass);
        copy.innerHTML = clipboard;
        copy.title = 'Copy';

        const copyContainer = document.createElement('div');
        copyContainer.className = 'copy-container';
        copyContainer.appendChild(copy);

        node.insertAdjacentElement('beforebegin', copyContainer);
        copy.addEventListener('click', async () => {
            if (navigator.clipboard) {
                // @ts-ignore
                const text = qs('code', node).innerText;
                await navigator.clipboard.writeText(text);
                copy.innerHTML = clipboardDone;
            } else {
                copy.innerHTML = clipboardError;
            }

            setTimeout(() => copy.innerHTML = clipboard, 2000);
        });
    });
}

export { enhanceCodeBlocks }
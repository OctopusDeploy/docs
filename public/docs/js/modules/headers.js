/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
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
        linkContainer.innerHTML = 'Bookmark'
        
        elem.appendChild(linkContainer);
    });

   
}

export { enhanceHeaders }
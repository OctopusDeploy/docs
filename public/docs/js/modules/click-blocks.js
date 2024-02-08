// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qsa } from './query.js';

const dataAttributeName = 'data-destination';

/**
 * Makes an entire block clickable based on a data-attribute, usually "data-destination"
 * 
 * Example: You have a list of blog posts, including featured images. If you make the title
 * clickable, clicks on the image won't open the blog. Adding links to the images means
 * keyboard users have to tab twice as much to get through the list.
 * 
 * Use clickable blocks to allow keyboard users to tab through the real links, but still
 * capture clicks elsewhere on the block.
 * 
 */
 function setClickableBlocks() {
    qsa('[' + dataAttributeName + ']').forEach((listItem) => {
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', handleClick);
        listItem.addEventListener('touch', handleClick);
    });
}

/**
 * Handles the block-level clicks
 * 
 * @param {Event} e 
 * @returns 
 */
function handleClick(e) {
    const location = this.getAttribute(dataAttributeName);

    if (location) {
        e.preventDefault();
        document.location = location;
        return false;
    }
}

export { setClickableBlocks };
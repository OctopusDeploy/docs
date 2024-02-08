// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qsa } from './query.js';

let links = [];
let current = '';
const headings = [];
const highlightClass = 'highlight';

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
function highlightCurrentHeading(tocSelector) {
    links = qsa(tocSelector);

    links.forEach((link) => {
        const bookmarkLink = getBookmarkLink(link.href);
        if (bookmarkLink) {
            headings.push(document.getElementById(bookmarkLink));
        }
    });

    recheck();
}

function getBookmarkLink(link) {
    const linkParts = link.split('#');
    if (linkParts.length === 2) {
        return linkParts[1];
    }

    return '';
}

function highlight(id) {
    links.forEach((link) => {
        link.classList.remove(highlightClass);

        const bookmarkLink = getBookmarkLink(link.href);
        if (bookmarkLink === id) {
            link.classList.add(highlightClass);
        }
    });
}

function recheck() {
    const docTop = Math.floor(document.documentElement.scrollTop);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    const validItems = [];

    headings.forEach((elem) => {
        
        const hasPassed = (elem.offsetTop < docTop);
        const inView = (elem.offsetTop > docTop) && (elem.offsetTop < (docTop + vh));
        const isValid = (docTop + vh) - elem.offsetTop > (vh / 1.5);

        if (isValid) {
            validItems.push(elem);
        }
    });

    const item = validItems.pop();

    if (item && item.id !== current) {
        current = item.id;
        highlight(item.id);
    }

    window.setTimeout(recheck, 1000);
}

export { highlightCurrentHeading };
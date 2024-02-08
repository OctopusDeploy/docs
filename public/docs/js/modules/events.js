// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

/**
 * 
 * @param {string} name 
 * @param {{[key: string]: any}} detail 
 * @param {Document | HTMLElement} [target]
 */
function raiseEvent(name, detail, target) {
    if (!target) {
        target = document;
    }

    const event = new CustomEvent(name, { detail: detail});
    document.dispatchEvent(event);
    console.log('Event Raised', name, detail);
}

export { raiseEvent };
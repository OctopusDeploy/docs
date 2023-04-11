// @ts-check

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
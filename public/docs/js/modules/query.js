// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

/**
 * 
 * @param {string} query 
 * @param {HTMLElement} [container]
 * @returns {HTMLElement}
 */
function qs(query, container) {
    const target = (container)
        ? container
        : document;

    /** @type {any} */
    const result = target.querySelector(query);

    if (result) {
        return result;
    }

    throw new Error(`No element ${query}`);
}

/**
 * Utility for query selector all
 * 
 * @param {string} query
 * @param {HTMLElement | null} [container]
 * @returns {NodeListOf<any>}
 */
 function qsa(query, container) {
    const target = (container)
        ? container
        : document;

    /** @type {NodeListOf<HTMLElement>} */
    const result = target.querySelectorAll(query);
    return result;
}

export { qs, qsa };
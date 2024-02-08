// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

/**
 * Looks for a search within a string
 * 
 * @param {string} string 
 * @param {string} search 
 * @returns 
 */
function contains(string, search) {
    return string.indexOf(search) > -1;
}

/**
 * Looks for a search within a string
 * 
 * @param {string} string 
 * @param {string} search 
 * @returns 
 */
function containsWord(string, search) {
    return string.split(' ').indexOf(search) > -1;
}

/**
 * 
 * @param {string} string 
 * @param {string[]} terms 
 * @returns 
 */
function highlight(string, terms) {
    terms.forEach(term => {
        const regEx = new RegExp(term, "ig");
        const matches = string.match(regEx);
        if (matches) {
            string = string.replace(regEx, `<mark>${matches[0]}</mark>`)
        }
    });
    return string;
}

/**
 * Simplifies a string to plain lower case, removing diacritic characters and hyphens
 * This means a search for "co-op" will be found in "COOP" and "Café" will be found in "cafe"
 * @param {string} string 
 * @returns {string}
 */
 function sanitise(string) {
    // @ts-ignore
    if (String.prototype.normalize) {
        // Reduces diacritic characters to plain characters
        string.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/-/g, '');
    }

    // Some browsers can't normalise strings
    return string.trim().toLowerCase().replace(/-/g, '');
}

/**
 * Sets a minimum length for a search
 * @param {string} string 
 * @returns 
 */
 function isLongEnough(string) {
    return string.length > 1;
}

/**
 * 
 * @param {string} string 
 * @returns {string[]}
 */
function explode(string) {
    return string.split(' ').filter(isLongEnough).map(sanitise);
}

export { contains, containsWord, sanitise, explode, highlight };
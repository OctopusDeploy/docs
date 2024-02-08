// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
let inputType = 'unknown';

/**
 * Sets the user input mode as a class
 */
function monitorInputType() {
    window.addEventListener('keydown', event => {
        const eventType = 'input-keyboard';
        processInput(eventType);
    });

    window.addEventListener('mousemove', event => {
        const eventType = 'input-mouse';
        processInput(eventType);
    });

    window.addEventListener('touchstart', event => {
        const eventType = 'input-touch';
        processInput(eventType);
    });
}

/**
 * Processes the keyboard, mouse, or touch event
 * @param {string} eventType 
 */
function processInput(eventType) {
    if (inputType !== eventType) {
        removeClass(inputType);
        inputType = eventType;
        addClass(inputType);
    }
}

/**
 * Removes an input type class from the body
 * @param {string} inputType 
 */
function removeClass(inputType) {
    document.body.classList.remove(inputType);
}

/**
 * Adds an input type class to the body
 * @param {string} inputType 
 */
function addClass(inputType) {
    document.body.classList.add(inputType);
}

export { monitorInputType };
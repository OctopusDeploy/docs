// @ts-check

import { raiseEvent } from './events.js';

var resizeEventName = 'resize';
var resizedEventName = 'resized';

var width = window.innerWidth;
var height = window.innerHeight;

/**
 * Adds a de-bounced "resized" event, so you can listen to:
 * document.addEventListener('resized', <handler>);
 * 
 * @returns {string}
 */
 function addResizedEvent() {
    let debounce = null;

    function resizeEnd(e) {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(raiseResizeEvent, 500);
    }

    function raiseResizeEvent() {
        const change = {
            width: window.innerWidth - width,
            height: window.innerHeight - height
        };

        width = window.innerWidth;
        height = window.innerHeight;
        

        raiseEvent(resizedEventName, { change: change });
    }

    window.addEventListener(resizeEventName, resizeEnd);

    return resizedEventName;
}

export { addResizedEvent };
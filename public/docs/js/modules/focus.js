// @ts-check

import { qsa } from './query.js';

/**
 * Gets first, last, and all focusable elements in the target
 * 
 * For the supplied element, finds all the elements that can receive keyboard focus.
 * 
 * Examples: a, button, input, textarea, select, and other valid interactive items
 * that haven't been disabled or hidden.
 * 
 * @param {HTMLElement} target element
 * @returns {{first: HTMLElement, last: HTMLElement, all: HTMLElement[]}}
 */
 function getFocusableElement(target) {
    const focusElements = Array.from(
        qsa('a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])', target)
    ).filter(function(el) {
        return !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden');
    });
    
    return {
        first: focusElements[0],
        last: focusElements[focusElements.length -1],
        all: focusElements
    };
}

/**
 * Mechanism to trap focus
 * 
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} focusItem 
 * @returns 
 */
function trapFocus(event, focusItem) {
    switch (event.code.toLowerCase()) {
        case 'tab':
        event.preventDefault();    
        focusItem.focus();
        return false;
    }
}

/**
 * Mechanism to trap focus (TAB)
 * 
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} focusItem 
 * @returns 
 */
function trapFocusForward(event, focusItem) {
    if (event.shiftKey) {
        return;
    }

    trapFocus(event, focusItem);
}

/**
 * Mechanism to trap tab (SHIFT + TAB)
 * 
 * @param {KeyboardEvent} event 
 * @param {HTMLElement} focusItem 
 * @returns 
 */
function trapReverseFocus(event, focusItem) {
    if (!event.shiftKey) {
        return;
    }

    trapFocus(event, focusItem);
}

export { getFocusableElement, trapFocusForward, trapReverseFocus };
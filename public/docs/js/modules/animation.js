// @ts-check

import { qsa } from './query.js';

/**
 * Assists animation by setting "--shown" CSS property
 * 
 * When an item is visible in the viewport, it will have --shown: 1
 * Otherwise it will be --shown: 0
 * This allows CSS transitions and calculated properties to animate elements
 * 
 * Example
 *     transition: all 0.2s ease-in;
 *     scale: calc(0.75 + (var(--shown, 1) * 0.25));
 * 
 * @param {string} listItemQuery 
 */
function addIntersectionObserver(listItemQuery) {
    function handleIntersection(entries, observer) {
        for (let entry of entries) {
            const value = entry.isIntersecting ? 1 : 0;
            entry.target.style.setProperty('--shown', value);
        }
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(handleIntersection, options)

    qsa(listItemQuery).forEach((elem) => observer.observe(elem));
}

/**
 * Assists animation by setting "--shown" CSS property
 * 
 * When an item is visible in the viewport, it will have --shown: 1
 * Otherwise it will be --shown: 0
 * This allows CSS transitions and calculated properties to animate elements
 * 
 * Example
 *     transition: all 0.2s ease-in;
 *     scale: calc(0.75 + (var(--shown, 1) * 0.25));
 * 
 * @param {string} imgItemQuery 
 */
 function addListImageIntersectionObserver(imgItemQuery) {
    function handleIntersection(entries, observer) {
        for (let entry of entries) {
            const value = entry.isIntersecting ? 1 : 0;
            entry.target.style.setProperty('--imgshown', value);
        }
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options)

    qsa(imgItemQuery).forEach((elem) => observer.observe(elem));
}

export { addIntersectionObserver, addListImageIntersectionObserver };
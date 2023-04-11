// @ts-check

import { qs } from './query.js';

/**
 * Makes an existing navigation element sticky
 * 
 * Example: If the existing navigation is not as tall as the content, the
 * navigation will stick to the top, allowing the user to see it as 
 * they scroll through the article
 * 
 * @param {string} headerSelector 
 * @param {string} navigationSelector 
 * @param {string} navigationListSelector 
 */
function addStickyNavigation(headerSelector, navigationSelector, navigationListSelector, resizedEventName) {
    function setNavigationMode() {
        const header = qs(headerSelector);
        const navigation = qs(navigationSelector);
        const navigationList = qs(navigationListSelector); 
        
        const buffer = 50;
        const className = 'sticky';

        const dimensions = {
            browserHeight: window.innerHeight,
            browserWidth: window.innerWidth,
            headerHeight: header.clientHeight,
            navigationHeight: navigationList.clientHeight
        };

        // Only enable sticky mode if the menu will fit vertically
        // && where the browser is more than 860px wide
        if (dimensions.navigationHeight < ((dimensions.browserHeight - Math.max(dimensions.headerHeight, site_features.stickyNav.top)) - buffer)
            && dimensions.browserWidth > 860) {
            console.log('Navigation: Sticky Mode');
            navigation.classList.add(className);
            const top = site_features.stickyNav.top ?? 220;
            navigation.style.top = top + 'px';
        } else {
            console.log('Navigation: Fixed Mode');
            navigation.classList.remove(className);
        }
    }

    setNavigationMode();

    document.addEventListener(resizedEventName, function(e) {
        if (e.detail && e.detail.change && e.detail.change.height != 0) {
            setNavigationMode();
        }
    });
}

export { addStickyNavigation };
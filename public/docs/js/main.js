// @ts-check

/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { addIntersectionObserver, addListImageIntersectionObserver } from './modules/animation.js';
import { addResizedEvent } from './modules/resizing.js';
import { addStickyNavigation } from './modules/nav-sticky.js';
import { addMobileNav } from './modules/nav-mobile.js';
import { setClickableBlocks } from './modules/click-blocks.js';
import { setExternalLinkAttributes } from './modules/external-links.js';
import { monitorInputType } from './modules/input-type.js';
import { enableSharing } from './modules/share.js';
import { highlightCurrentHeading } from './modules/toc.js';

const resizedEventName = addResizedEvent();

setClickableBlocks();
setExternalLinkAttributes();
addStickyNavigation('.site-header', '#site-nav', '#site-nav > ul', resizedEventName);
addMobileNav(resizedEventName);
addIntersectionObserver('.anim-show-parent img, .anim-show-parent .list-item');
addListImageIntersectionObserver('.post-list img');
monitorInputType();
enableSharing();
highlightCurrentHeading('.page-toc a');

// @ts-ignore
const f = site_features ?? {};

/**
 * 
 * @param {string[]} settings 
 * @param {string} option 
 * @returns 
 */
function enabled(settings, option) {
    return settings
        && settings.includes(option);
}

if (enabled(f.details, 'tabs')) {
    const tabs = await import('./modules/detail-tabs.js');
    tabs.enhanceDetailGroups();
}

if (enabled(f.youTubeLinks, 'embed')) {
    const youTube = await import('./modules/youtube.js');
    youTube.enhanceYoutubeLinks();
}

if (enabled(f.codeBlocks, 'copy')) {
    const codeBlocks = await import('./modules/code-blocks.js');
    codeBlocks.enhanceCodeBlocks();
}

if (enabled(f.figures, 'enlarge')) {
    const figures = await import('./modules/figures.js');
    figures.enhanceFigures();
}

if (enabled(f.headers, 'link')) {
    const headers = await import('./modules/headers.js');
    headers.enhanceHeaders();
}

if (enabled(f.search, 'dialog')) {
    const searchDialog = await import ('./modules/search-dialog.js');
    searchDialog.enhanceSearchIcon();
}
// @ts-check
import {
  addIntersectionObserver,
  addListImageIntersectionObserver,
} from './modules/animation.js';
import { addResizedEvent } from './modules/resizing.js';
import { setClickableBlocks } from './modules/click-blocks.js';
import { setExternalLinkAttributes } from './modules/external-links.js';
import { monitorInputType } from './modules/input-type.js';
import { enableSharing } from './modules/share.js';
import { highlightCurrentHeading } from './modules/toc.js';
import { enhanceTooltips } from './modules/tooltips';

addResizedEvent();

enhanceTooltips();
setClickableBlocks();
setExternalLinkAttributes();
addIntersectionObserver('.anim-show-parent img, .anim-show-parent .card');
addListImageIntersectionObserver('.card img');
monitorInputType();
enableSharing();
highlightCurrentHeading('.page-toc a');
highlightCurrentHeading('.article-nav a');
// The API section lists the current page's endpoints in the left nav instead
// of a table of contents, so that list tracks the reader the same way.
highlightCurrentHeading('.site-nav__link--heading');

// @ts-ignore
const f = site_features ?? {};

/**
 *
 * @param {string[]} settings
 * @param {string} option
 * @returns
 */
function enabled(settings, option) {
  return settings && settings.includes(option);
}

// Ahead of the tabs: a group whose panels are all code becomes one code block
// with a language menu, and code-blocks.js removes it so tabs skip it.
if (enabled(f.codeBlocks, 'copy')) {
  const codeBlocks = await import('./modules/code-blocks.js');
  codeBlocks.enhanceCodeBlocks();
}

if (enabled(f.details, 'tabs')) {
  const tabs = await import('./modules/detail-tabs.js');
  tabs.enhanceDetailGroups();
}

if (enabled(f.youTubeLinks, 'embed')) {
  const youTube = await import('./modules/youtube.js');
  youTube.enhanceYoutubeLinks();
}

if (enabled(f.figures, 'enlarge')) {
  const figures = await import('./modules/figures.js');
  figures.enhanceFigures();
}

if (enabled(f.headers, 'link')) {
  const headers = await import('./modules/headers.js');
  headers.enhanceHeaders();
}

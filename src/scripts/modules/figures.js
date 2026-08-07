import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { qsa } from './query.js';

// Matches the Figma geometry: a 1600x900 image inset in a 1904x1000 viewport
const inset = { wide: 50, narrow: 16 };
const duration = 400;

/** @type {HTMLImageElement | null} */
let source = null;

/**
 * The biggest version of an image we can reach without asking the build for
 * anything. A srcset carries the real width of each candidate in its
 * descriptor, and an image without one is already serving its full size, so
 * the loaded thumbnail's own dimensions are the answer.
 *
 * @param {HTMLImageElement} img
 */
function largest(img) {
  const ratio = img.naturalWidth / img.naturalHeight;

  const candidates = (img.getAttribute('srcset') ?? '')
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/))
    .filter(([, descriptor]) => descriptor?.endsWith('w'))
    .map(([url, descriptor]) => ({ url, width: parseInt(descriptor, 10) }))
    .sort((a, b) => b.width - a.width);

  if (candidates.length) {
    const best = candidates[0];
    return {
      src: best.url,
      width: best.width,
      height: Math.round(best.width / ratio),
    };
  }

  return {
    src: img.currentSrc || img.src,
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
}

function padding() {
  const space = window.innerWidth < 640 ? inset.narrow : inset.wide;
  return { top: space, bottom: space, left: space, right: space };
}

/**
 * Opens content images in a full-viewport lightbox
 */
function enhanceFigures() {
  const lightbox = new PhotoSwipeLightbox({
    pswpModule: () => import('photoswipe'),

    // The design is the image on an opaque page background and nothing else
    counter: false,
    arrowPrev: false,
    arrowNext: false,
    zoom: false,
    bgOpacity: 1,

    // Cursor reads zoom-out everywhere, so every surface closes
    imageClickAction: 'close',
    bgClickAction: 'close',
    tapAction: 'close',

    showAnimationDuration: duration,
    hideAnimationDuration: duration,
    initialZoomLevel: 'fit',
    secondaryZoomLevel: 'fit',
    maxZoomLevel: 4,
  });

  // Whichever image was clicked is the one to animate from and back to
  lightbox.addFilter('thumbBounds', () => {
    if (!source) return null;

    const rect = source.getBoundingClientRect();
    return { x: rect.left, y: rect.top, w: rect.width };
  });

  lightbox.on('uiRegister', () => {
    lightbox.pswp.options.padding = padding();
  });

  lightbox.init();

  qsa('figure img').forEach((img) => {
    img.tabIndex = 0;

    const open = () => {
      source = img;
      lightbox.loadAndOpen(0, [{ ...largest(img), alt: img.alt }]);
    };

    img.addEventListener('click', open);
    img.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      open();
    });
  });
}

export { enhanceFigures };

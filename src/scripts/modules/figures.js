import { qsa } from './query.js';

const inset = { wide: 50, narrow: 16 };
const duration = 400;

/** @type {(() => void) | null} */
let dismiss = null;

function stillFrames() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * The rect the image animates to: its own aspect ratio, centred in the
 * viewport, never scaled past the source image's real pixel width.
 *
 * @param {HTMLImageElement} img
 */
function targetRect(img) {
  const padding = window.innerWidth < 640 ? inset.narrow : inset.wide;
  const room = {
    width: window.innerWidth - padding * 2,
    height: window.innerHeight - padding * 2,
  };

  const ratio = img.naturalWidth / img.naturalHeight;
  const native = Number(img.getAttribute('width')) || img.naturalWidth;

  let width = Math.min(room.width, room.height * ratio, native);
  let height = width / ratio;

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

/**
 * @param {HTMLElement} node
 * @param {{ left: number, top: number, width: number, height: number }} rect
 */
function place(node, rect) {
  node.style.left = `${rect.left}px`;
  node.style.top = `${rect.top}px`;
  node.style.width = `${rect.width}px`;
  node.style.height = `${rect.height}px`;
}

/**
 * @param {HTMLImageElement} img
 */
function open(img) {
  dismiss?.();

  const overlay = document.createElement('div');
  overlay.className = 'zoom-overlay';

  const lightbox = document.createElement('div');
  lightbox.className = 'zoom-lightbox';

  const frame = document.createElement('div');
  const clone = /** @type {HTMLImageElement} */ (img.cloneNode());

  // A viewport-wide candidate beats the one picked for a column-width thumbnail
  if (clone.srcset) {
    clone.sizes = '100vw';
  }

  frame.appendChild(clone);
  lightbox.appendChild(frame);
  document.body.append(overlay, lightbox);

  place(frame, img.getBoundingClientRect());
  img.dataset.hidden = 'true';

  if (stillFrames()) {
    place(frame, targetRect(img));
  } else {
    frame.getBoundingClientRect();
    requestAnimationFrame(() => {
      frame.style.transition = `all ${duration}ms ease-out`;
      place(frame, targetRect(img));
    });
  }

  /** @param {KeyboardEvent} event */
  const onKey = (event) => {
    if (event.key === 'Escape') dismiss?.();
  };

  dismiss = () => {
    dismiss = null;
    document.removeEventListener('keydown', onKey);
    overlay.classList.add('zoom-overlay--closing');

    let closed = false;
    const done = () => {
      if (closed) return;
      closed = true;

      overlay.remove();
      lightbox.remove();
      delete img.dataset.hidden;
      img.focus({ preventScroll: true });
    };

    if (stillFrames()) {
      done();
      return;
    }

    // Recomputed, because the page can scroll while the lightbox is open
    place(frame, img.getBoundingClientRect());
    frame.addEventListener('transitionend', done, { once: true });
    setTimeout(done, duration + 50);
  };

  overlay.addEventListener('click', () => dismiss?.());
  lightbox.addEventListener('click', () => dismiss?.());
  document.addEventListener('keydown', onKey);
}

/**
 * Opens content images in a full-viewport lightbox.
 *
 * The image carries the interaction itself, so the markup stays a plain
 * <img>. tabindex is what a wrapping button would otherwise have given for
 * free, and without it the zoom would be mouse-only.
 */
function enhanceFigures() {
  qsa('figure img').forEach((img) => {
    img.tabIndex = 0;

    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      open(img);
    });
  });
}

export { enhanceFigures };

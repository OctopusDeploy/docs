import { qsa } from './query.js';

const inset = { wide: 50, narrow: 16 };
const duration = 400;

/** @type {(() => void) | null} */
let dismiss = null;

function stillFrames() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * The full-size file for what the image is showing. A themed
 * `:img{src-dark=...}` is a <picture> whose dark <source> may be the one in
 * use, and `img.src` only ever holds the light original.
 *
 * @param {HTMLImageElement} img
 */
function originalSrc(img) {
  const source = img.parentElement?.querySelector(
    'source[data-original-src]'
  );

  if (source && window.matchMedia(source.media).matches) {
    return new URL(source.dataset.originalSrc, document.baseURI).href;
  }

  return img.src;
}

/**
 * Where the image lands: its own aspect ratio, centred, never wider than the
 * source really is. Vector images have no real source size, so they fill the
 * room.
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
  const vector = new URL(originalSrc(img)).pathname.endsWith('.svg');
  const native = vector
    ? Infinity
    : Number(img.getAttribute('width')) || img.naturalWidth;

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

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'zoom-close';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close image');

  const frame = document.createElement('div');
  // Copied attribute by attribute rather than with cloneNode(), which would
  // start downloading the light original of a themed image in dark mode.
  // Every srcset entry is a variant generated for a column, capped at 2000px,
  // so keep the clone off them and on the full-size original.
  const clone = document.createElement('img');

  for (const { name, value } of img.attributes) {
    if (!['src', 'srcset', 'sizes'].includes(name)) {
      clone.setAttribute(name, value);
    }
  }

  clone.src = originalSrc(img);

  frame.appendChild(clone);
  lightbox.append(frame, close);
  document.body.append(overlay, lightbox);

  // Hiding the document's overflow would take the scrollbar away, widening
  // the viewport and shifting the page out from under the fixed header.
  const refuse = (/** @type {Event} */ event) => event.preventDefault();
  lightbox.addEventListener('wheel', refuse, { passive: false });
  lightbox.addEventListener('touchmove', refuse, { passive: false });

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

    // Leaving it up for the length of the animation reads as a missed click
    close.remove();

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

    // Recomputed, because the keyboard can still scroll the page underneath
    place(frame, img.getBoundingClientRect());
    frame.addEventListener('transitionend', done, { once: true });
    setTimeout(done, duration + 50);
  };

  overlay.addEventListener('click', () => dismiss?.());
  lightbox.addEventListener('click', () => dismiss?.());
  document.addEventListener('keydown', onKey);

  // Focus would otherwise sit on the hidden image, sending the first Tab into
  // the page behind
  close.focus({ preventScroll: true });
}

/**
 * Opens content images in a full-viewport lightbox. The interaction sits on
 * the image itself, so the markup stays a plain <img> and tabindex keeps it
 * reachable without a wrapper.
 */
function enhanceFigures() {
  qsa('figure img').forEach((img) => {
    img.tabIndex = 0;

    // Fetch the original before the click, so the zoom does not open on a
    // stretched thumbnail
    const warm = () => {
      const src = originalSrc(img);
      if (src !== img.currentSrc) new Image().src = src;
    };

    img.addEventListener('pointerenter', warm, { once: true });
    img.addEventListener('focus', warm, { once: true });
    img.addEventListener('touchstart', warm, { once: true, passive: true });

    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      open(img);
    });
  });
}

export { enhanceFigures };

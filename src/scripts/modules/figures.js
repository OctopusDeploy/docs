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
 * The version of an image with the most pixels in it.
 *
 * src is the untouched original, so it is never smaller than anything in the
 * srcset and is the answer whenever the two differ - the widest generated
 * variant stops at 2000px, which throws away most of a 3326px screenshot.
 * When a variant does match the original's width it is the same picture in a
 * newer format, so it wins on weight: 67KB against 183KB for the dashboard.
 *
 * @param {HTMLImageElement} img
 */
function largest(img) {
  const original = img.getAttribute('src') ?? img.currentSrc;
  const native = Number(img.getAttribute('width'));
  if (!native) return original;

  const widest = (img.getAttribute('srcset') ?? '')
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/))
    .filter(([, descriptor]) => descriptor?.endsWith('w'))
    .map(([url, descriptor]) => ({ url, width: parseInt(descriptor, 10) }))
    .sort((a, b) => b.width - a.width)[0];

  return widest && widest.width >= native ? widest.url : original;
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
  const clone = /** @type {HTMLImageElement} */ (img.cloneNode());

  // The thumbnail was picked for a column, so it has fewer pixels than the
  // lightbox needs. Naming the full-size file beats leaving the browser to
  // reselect, which keeps the small one on screen until the swap lands.
  clone.removeAttribute('srcset');
  clone.removeAttribute('sizes');
  clone.src = largest(img);

  frame.appendChild(clone);
  lightbox.append(frame, close);
  document.body.append(overlay, lightbox);

  // Refusing the scroll on the overlay itself, the way PhotoSwipe does it.
  // Hiding the document's overflow would take the scrollbar away, widening
  // the viewport and shifting the content out from under the fixed header.
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

    // The way out has been taken, so the button has no job for the length of
    // the animation. Leaving it up reads as the lightbox failing to close.
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

    // Recomputed, because the page can scroll while the lightbox is open
    place(frame, img.getBoundingClientRect());
    frame.addEventListener('transitionend', done, { once: true });
    setTimeout(done, duration + 50);
  };

  overlay.addEventListener('click', () => dismiss?.());
  lightbox.addEventListener('click', () => dismiss?.());
  document.addEventListener('keydown', onKey);

  // Focus stays on the image otherwise, which is hidden while the lightbox is
  // open, so the first Tab would walk into the page behind it instead of
  // reaching the way out.
  close.focus({ preventScroll: true });
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

    // Fetching the full size on the way to the click means the zoom does not
    // spend its first frames showing the column-sized version stretched
    const warm = () => {
      const full = largest(img);
      if (full !== img.currentSrc) new Image().src = full;
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

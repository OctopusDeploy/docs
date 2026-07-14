// Content image lightbox. Enhances content images with an accessible "enlarge"
// affordance that opens a native <dialog> lightbox: the image scales up on a dimmed,
// blurred backdrop, can be toggled to its actual size (with pan), and is dismissed via
// Escape / backdrop / close button. Self-contained (native <dialog>, no deps, no
// icon-font), a no-op without matching images, and idempotent. The <dialog> gives a real
// focus trap, background inert, top-layer paint and focus-restore for free. Styling lives in
// styles/components.css (`.ink-lightbox*`, `.magnify-*`); icons are masked-SVG tokens.

let dialog: HTMLDialogElement | null = null;
let lbImg: HTMLImageElement;
let lbCaption: HTMLElement;
let isClosing = false;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function build(): HTMLDialogElement {
  const d = document.createElement('dialog');
  d.className = 'ink-lightbox';
  d.setAttribute('aria-label', 'Image viewer');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'ink-lightbox__close';
  close.setAttribute('aria-label', 'Close image viewer');

  const figure = document.createElement('figure');
  figure.className = 'ink-lightbox__figure';

  lbImg = document.createElement('img');
  lbImg.className = 'ink-lightbox__img';
  lbImg.alt = '';

  lbCaption = document.createElement('figcaption');
  lbCaption.className = 'ink-lightbox__caption';

  figure.append(lbImg, lbCaption);
  d.append(close, figure);
  document.body.appendChild(d);

  close.addEventListener('click', requestClose);
  // Click on the backdrop (the dialog element itself, or the figure's padding around the
  // image) closes; clicking the image toggles actual-size zoom instead.
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target === figure) requestClose();
  });
  // Escape fires the dialog's `cancel` event; run our animated close instead of the
  // instant native one.
  d.addEventListener('cancel', (e) => {
    e.preventDefault();
    requestClose();
  });
  lbImg.addEventListener('click', (e) => {
    e.stopPropagation();
    d.classList.toggle('is-zoomed');
  });

  return (dialog = d);
}

function open(src: string, caption: string, alt: string): void {
  const d = dialog ?? build();
  isClosing = false;
  lbImg.src = src;
  lbImg.alt = alt;
  lbCaption.textContent = caption;
  lbCaption.hidden = caption === '';
  d.classList.remove('is-zoomed');
  document.documentElement.style.overflow = 'hidden';
  d.showModal();
  if (prefersReducedMotion()) {
    d.classList.add('is-open');
  } else {
    requestAnimationFrame(() => d.classList.add('is-open'));
  }
}

function requestClose(): void {
  const d = dialog;
  if (!d || isClosing) return;

  const finish = (): void => {
    d.classList.remove('is-open', 'is-zoomed');
    d.close();
    document.documentElement.style.overflow = '';
    lbImg.removeAttribute('src');
    isClosing = false;
  };

  if (prefersReducedMotion()) {
    finish();
    return;
  }

  isClosing = true;
  d.classList.remove('is-open');
  let done = false;
  const settle = (): void => {
    if (done) return;
    done = true;
    d.removeEventListener('transitionend', onEnd);
    finish();
  };
  const onEnd = (e: TransitionEvent): void => {
    if (e.target === d.querySelector('.ink-lightbox__figure')) settle();
  };
  d.addEventListener('transitionend', onEnd);
  window.setTimeout(settle, 400); // fallback if transitionend is missed
}

function captionFor(img: HTMLImageElement): string {
  const fig = img.closest('figure');
  const cap = fig?.querySelector('figcaption, .image__caption');
  return cap?.textContent?.trim() || img.alt || '';
}

export function enhanceFigures(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLImageElement>(
      'figure > p > img, [data-image] > .image__img'
    )
    .forEach((img) => {
      if (img.dataset.inkLightbox) return; // idempotent
      img.dataset.inkLightbox = 'true';

      const activate = (): void =>
        open(img.currentSrc || img.src, captionFor(img), img.alt || '');

      // Mouse convenience: the image itself is clickable (not a tab stop, to avoid a
      // duplicate - keyboard/AT users use the button below).
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', activate);

      // Accessible, focusable trigger for keyboard/touch/discoverability.
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'magnify-icon';
      button.title = 'Enlarge';
      button.setAttribute(
        'aria-label',
        img.alt ? `Enlarge image: ${img.alt}` : 'Enlarge image'
      );
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        activate();
      });

      const container = document.createElement('div');
      container.className = 'magnify-container';
      container.appendChild(button);
      img.insertAdjacentElement('beforebegin', container);
    });
}

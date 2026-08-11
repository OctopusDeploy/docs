const AVATAR_SELECTOR = '[data-avatar]';
const IMAGE_SELECTOR = '[data-avatar-image]';
const FALLBACK_SELECTOR = '[data-avatar-fallback]';

function showImage(avatar: HTMLElement, image: HTMLImageElement) {
  const fallback = avatar.querySelector<HTMLElement>(FALLBACK_SELECTOR);
  if (fallback) fallback.hidden = true;
  image.hidden = false;
}

function showFallback(avatar: HTMLElement, image: HTMLImageElement) {
  const fallback = avatar.querySelector<HTMLElement>(FALLBACK_SELECTOR);
  if (fallback) fallback.hidden = false;
  image.hidden = true;
}

function watch(avatar: HTMLElement, image: HTMLImageElement) {
  if (image.complete) {
    if (image.naturalWidth > 0) showImage(avatar, image);
    return;
  }

  image.addEventListener('load', () => showImage(avatar, image), {
    once: true,
  });
}

export function setAvatarImage(
  avatar: HTMLElement,
  src: string,
  srcSet: string = ''
) {
  const image = avatar.querySelector<HTMLImageElement>(IMAGE_SELECTOR);
  if (!image) return;

  if (!src) {
    image.removeAttribute('srcset');
    image.removeAttribute('src');
    showFallback(avatar, image);
    return;
  }

  if (
    image.getAttribute('src') !== src ||
    (image.getAttribute('srcset') ?? '') !== srcSet
  ) {
    showFallback(avatar, image);
    if (srcSet) {
      image.srcset = srcSet;
    } else {
      image.removeAttribute('srcset');
    }
    image.src = src;
  }

  watch(avatar, image);
}

function bind(avatar: HTMLElement) {
  const image = avatar.querySelector<HTMLImageElement>(IMAGE_SELECTOR);
  if (!image || !image.getAttribute('src')) return;
  watch(avatar, image);
}

function bindAll() {
  document.querySelectorAll<HTMLElement>(AVATAR_SELECTOR).forEach(bind);
}

bindAll();

document.addEventListener('astro:after-swap', bindAll);

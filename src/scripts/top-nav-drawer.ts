import { removeScroll, resetScroll } from './modules/scrollbar.js';

// Matches the responsive design's collapse width breakpoint in TopNav.astro
const COMPACT_QUERY = '(max-width: 1130px)';

const PANEL_SELECTOR = '[data-top-nav-panel]';
const TOGGLE_SELECTOR = '[data-top-nav-toggle]';
const NAV_SLOT_SELECTOR = '[data-top-nav-nav-slot]';
const SITE_NAV_SELECTOR = '#site-nav';

const ICON_SELECTOR = '.btn__icon';
const BARS_ICON = 'top-nav__bars-icon';
const CLOSE_ICON = 'top-nav__close-icon';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'summary',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([tabindex="-1"])`)
  .join(', ');

const panel = document.querySelector<HTMLElement>(PANEL_SELECTOR);
const toggle = document.querySelector<HTMLElement>(TOGGLE_SELECTOR);
const navSlot = document.querySelector<HTMLElement>(NAV_SLOT_SELECTOR);

const siteNav = document.querySelector<HTMLElement>(SITE_NAV_SELECTOR);
const navHome = siteNav?.parentElement ?? null;
const navHomeNextSibling = siteNav?.nextElementSibling ?? null;

const compact = window.matchMedia(COMPACT_QUERY);

function isOpen() {
  return panel?.hasAttribute('data-open') ?? false;
}

function setIcon(name: string) {
  const icon = toggle?.querySelector(ICON_SELECTOR);
  icon?.classList.remove(name === BARS_ICON ? CLOSE_ICON : BARS_ICON);
  icon?.classList.add(name);
}

function open() {
  if (!panel || !toggle || isOpen()) return;

  panel.setAttribute('data-open', '');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation');
  setIcon(CLOSE_ICON);
  removeScroll();
}

function close({ restoreFocus = false } = {}) {
  if (!panel || !toggle || !isOpen()) return;

  const hadFocus = panel.contains(document.activeElement);

  panel.removeAttribute('data-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  setIcon(BARS_ICON);
  resetScroll();

  if (restoreFocus || hadFocus) toggle.focus();
}

/** Move the nav tree between the sidebar (when wide) and the drawer (when narrow). */
function placeNav(isCompact: boolean) {
  if (!siteNav || !navSlot || !navHome) return;

  if (isCompact) {
    if (siteNav.parentElement !== navSlot) {
      navSlot.append(siteNav);
    }
    // Undo nav-sticky.js hiding the tree
    siteNav.style.display = '';
  } else if (siteNav.parentElement !== navHome) {
    navHome.insertBefore(siteNav, navHomeNextSibling);
  }
}

function focusable() {
  if (!panel || !toggle) return [];

  const inPanel = [
    ...panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ].filter((element) => element.offsetParent !== null);

  return [toggle, ...inPanel];
}

if (panel && toggle) {
  toggle.addEventListener('click', () => {
    if (isOpen()) close({ restoreFocus: true });
    else open();
  });

  // Ensure a link to a heading on the page you're already on closes the drawer
  panel.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('a[href]')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      // Only close the drawer if nothing else that listens for the escape key is already open
      if (document.querySelector('[data-menu][open], dialog[open]')) return;
      close({ restoreFocus: true });
      return;
    }

    if (event.key !== 'Tab') return;

    const elements = focusable();
    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  compact.addEventListener('change', (event) => {
    placeNav(event.matches);
    if (!event.matches) close();
  });

  placeNav(compact.matches);

  document.documentElement.dataset.navDrawer = 'ready';
}

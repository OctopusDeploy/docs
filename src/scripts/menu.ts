const MENU_SELECTOR = '[data-menu]';
const ITEM_SELECTOR = '[role="menuitem"]';

function openMenus() {
  return document.querySelectorAll<HTMLDetailsElement>(
    `${MENU_SELECTOR}[open]`
  );
}

function triggerOf(menu: HTMLDetailsElement) {
  return menu.querySelector<HTMLElement>(':scope > summary');
}

document.addEventListener('click', (event) => {
  const target = event.target;

  openMenus().forEach((menu) => {
    if (target instanceof Node && menu.contains(target)) return;
    menu.open = false;
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  openMenus().forEach((menu) => {
    // Hand focus back only when it was inside the menu being closed
    const menuHadFocus = menu.contains(document.activeElement);
    menu.open = false;
    if (menuHadFocus) triggerOf(menu)?.focus();
  });
});

document.addEventListener('keydown', (event) => {
  const steps: Record<string, (last: number, at: number) => number> = {
    ArrowDown: (last, at) => (at >= last ? 0 : at + 1),
    ArrowUp: (last, at) => (at <= 0 ? last : at - 1),
    Home: () => 0,
    End: (last) => last,
  };

  const step = steps[event.key];
  if (!step || !(event.target instanceof Element)) return;

  const menu = event.target.closest<HTMLDetailsElement>(MENU_SELECTOR);
  if (!menu) return;

  const items = [...menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)];
  if (items.length === 0) return;

  // Down off the trigger opens the menu on its first item
  event.preventDefault();
  menu.open = true;

  const at = items.indexOf(document.activeElement as HTMLElement);
  const from = at === -1 && event.key === 'ArrowUp' ? 0 : at;
  const target = items[step(items.length - 1, from)];

  // The open is applied immediately, but the list only becomes focusable once it has been drawn
  // one frame later
  target.focus({ preventScroll: true });
  if (document.activeElement !== target) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => target.focus({ preventScroll: true }))
    );
  }
});

// Hide the menu when scrolling
['wheel', 'touchmove'].forEach((gesture) => {
  window.addEventListener(
    gesture,
    () => {
      openMenus().forEach((menu) => {
        menu.open = false;
      });
    },
    { passive: true }
  );
});

document.addEventListener('focusout', (event) => {
  const next = event.relatedTarget;

  openMenus().forEach((menu) => {
    if (!(event.target instanceof Node) || !menu.contains(event.target)) return;
    if (next === null || (next instanceof Node && menu.contains(next))) return;
    menu.open = false;
  });
});

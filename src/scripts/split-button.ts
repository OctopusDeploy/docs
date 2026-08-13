const MENU_SELECTOR = '[data-split-menu]';
const TRIGGER_SELECTOR = '[data-split-trigger]';
const ITEM_SELECTOR = '[role="menuitem"]';

function openMenus() {
  return document.querySelectorAll<HTMLDetailsElement>(
    `${MENU_SELECTOR}[open]`
  );
}

// `<details>` opens and closes itself, so the page only has to say when an open
// menu should give up. The listeners sit on the document and read the open menus
// at the moment they fire, which covers however many split buttons a page
// renders without binding anything per instance.
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
    // Hand focus back only when it was inside the menu being closed; taking it
    // from elsewhere on the page would move the caret out from under the reader.
    const held = menu.contains(document.activeElement);
    menu.open = false;
    if (held) menu.querySelector<HTMLElement>(TRIGGER_SELECTOR)?.focus();
  });
});

// A menu is walked with the arrow keys rather than the tab key, so the items are
// out of the tab order and this puts focus on them. Tab is left alone, which
// takes the reader past the whole control in one press, as a menu should.
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

  // Down off the caret opens the menu on its first item, which is how a menu
  // button behaves; the page scroll the arrow would otherwise cause is not.
  event.preventDefault();
  menu.open = true;

  const at = items.indexOf(document.activeElement as HTMLElement);
  const from = at === -1 && event.key === 'ArrowUp' ? 0 : at;
  const target = items[step(items.length - 1, from)];

  // A shut menu skips its contents, and skipped content cannot take focus. The
  // open is applied at once but the list only becomes focusable once it has been
  // drawn, which is a frame after the one that draws it, so the first press off
  // the caret asks again from there.
  target.focus({ preventScroll: true });
  if (document.activeElement !== target) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => target.focus({ preventScroll: true }))
    );
  }
});

// The design system's menu holds the page still while it is open, so the button
// it hangs off can never leave. Letting the page move and closing the menu is
// the lighter answer for a page someone is reading, and it rules out the menu
// being left adrift of the button the same way.
//
// The gesture is what is watched rather than the scrolling it causes: the site
// scrolls smoothly, so a scroll started before the menu opened is still running
// after it, and a menu would close itself on the tail of the scroll that brought
// its button into view.
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

// Tabbing past the last item leaves an open menu with nothing pointing at it,
// which is both a menu the reader has left behind and one that keeps its place
// on screen while the page scrolls out from under it.
document.addEventListener('focusout', (event) => {
  const next = event.relatedTarget;

  openMenus().forEach((menu) => {
    if (!(event.target instanceof Node) || !menu.contains(event.target)) return;
    // A move between two items inside the same menu is not leaving it, and a
    // move to nothing at all (a click on the page chrome) is left to the click
    // and Escape handlers so that focus is not taken from wherever it lands.
    if (next === null || (next instanceof Node && menu.contains(next))) return;
    menu.open = false;
  });
});

const MENU_SELECTOR = '[data-split-menu]';
const TRIGGER_SELECTOR = '[data-split-trigger]';

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

const MENU_SELECTOR = '[data-split-menu]';
const TRIGGER_SELECTOR = '[data-split-trigger]';

function openMenus() {
  return document.querySelectorAll<HTMLDetailsElement>(
    `${MENU_SELECTOR}[open]`
  );
}

// `<details>` opens and closes itself, so the page only has to say when an open
// menu should give up. Both listeners sit on the document and read the open
// menus at the moment they fire, which covers however many split buttons a page
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

import { copyOnClick, revertAfter } from './modules/clipboard.js';

// Which label shows, and which glyph the icon masks, is CSS's decision - both
// labels are in the DOM, and this only says whether the copy landed.
//
// A copy that fails says nothing. Writing text to the clipboard is not something
// a reader can act on the failure of, and the chain in clipboard.js already logs
// whichever rung refused.
function showCopied(button: HTMLElement, ok: boolean): string {
  if (!ok) return '';

  button.dataset.copied = '';
  revertAfter(button, () => delete button.dataset.copied);

  const label = button.querySelector<HTMLElement>('.octo-copy-md__copied');
  return label?.textContent?.trim() ?? '';
}

// Handed over unresolved: the clipboard write starts while the page is still
// downloading, which is what keeps the copy working in Safari.
function pageMarkdown(button: HTMLElement): Promise<string> | null {
  // The URL sits on the split button wrapping the copy half, so that a click on
  // the caret beside it resolves to the menu rather than to a copy.
  const url =
    button.closest<HTMLElement>('[data-copy-md-url]')?.dataset.copyMdUrl;
  if (!url) return null;

  return fetch(url).then((response) => {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.text();
  });
}

// Matched on the primary half rather than on the control, so that the caret does
// not copy the page on its way to opening the menu.
copyOnClick('[data-copy-md-url] .split-btn__primary', pageMarkdown, {
  show: showCopied,
});

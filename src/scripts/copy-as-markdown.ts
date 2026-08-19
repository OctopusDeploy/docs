import { copyOnClick, revertAfter } from './modules/clipboard.js';

// Which label shows, and which glyph the icon masks, is CSS's decision - all
// three labels are in the DOM, and this only says which state the button is in.
function showLabelResult(button: HTMLElement, ok: boolean): string {
  const state = ok ? 'copied' : 'failed';

  // Both are cleared every time, so a failure followed by a success inside the
  // revert window does not leave the button wearing two states at once.
  const rest = () => {
    delete button.dataset.copied;
    delete button.dataset.failed;
  };

  rest();
  button.dataset[state] = '';
  revertAfter(button, rest);

  const label = button.querySelector<HTMLElement>(
    `.octo-copy-md__label--${state}`
  );
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
  show: showLabelResult,
});

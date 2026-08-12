import { announce, REVERT_MS } from './modules/copy-button.js';

// navigator.clipboard requires a secure context; falls back to execCommand for
// HTTP and older browsers.
async function writeToClipboard(text: string): Promise<boolean> {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function' &&
    window.isSecureContext !== false
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn(
        '[copy-as-markdown] clipboard write failed, falling back',
        error
      );
    }
  }

  return execCommandCopyFallback(text);
}

function execCommandCopyFallback(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.append(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    console.warn('[copy-as-markdown] execCommand fallback threw', error);
  }
  textarea.remove();

  return copied;
}

const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

// Which label shows, and which glyph the icon masks, is CSS's decision - all
// three labels are in the DOM, and this only says which state the button is in.
function showResult(button: HTMLElement, state: 'copied' | 'failed') {
  // Both are cleared every time, so a failure followed by a success inside the
  // revert window does not leave the button wearing two states at once.
  const rest = () => {
    delete button.dataset.copied;
    delete button.dataset.failed;
  };

  rest();
  button.dataset[state] = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      rest();
      timers.delete(button);
    }, REVERT_MS)
  );

  const label = button.querySelector<HTMLElement>(
    `.octo-copy-md__label--${state}`
  );
  announce(label?.textContent?.trim() ?? '');
}

async function copyPageMarkdown(button: HTMLElement) {
  const url = button.dataset.copyMdUrl;
  if (!url) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    const written = await writeToClipboard(await response.text());
    if (!written) throw new Error('clipboard-write-failed');

    showResult(button, 'copied');
  } catch (error) {
    console.error('[copy-as-markdown] failed:', error);
    showResult(button, 'failed');
  }
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest<HTMLElement>('[data-copy-md-url]');
  if (button) copyPageMarkdown(button);
});

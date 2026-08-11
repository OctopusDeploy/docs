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

function showResult(button: HTMLElement, message: string, copied: boolean) {
  const label = button.querySelector<HTMLElement>('.btn__label');
  const rest = button.dataset.copyMdLabel ?? '';

  if (label) label.textContent = message;
  if (copied) button.dataset.copied = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      if (label) label.textContent = rest;
      delete button.dataset.copied;
      timers.delete(button);
    }, REVERT_MS)
  );
}

async function copyPageMarkdown(button: HTMLElement) {
  const url = button.dataset.copyMdUrl;
  if (!url) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    const written = await writeToClipboard(await response.text());
    if (!written) throw new Error('clipboard-write-failed');

    const message = button.dataset.copyMdCopied ?? 'Copied';
    showResult(button, message, true);
    announce(message);
  } catch (error) {
    console.error('[copy-as-markdown] failed:', error);
    const message = button.dataset.copyMdError ?? 'Copy failed';
    showResult(button, message, false);
    announce(message);
  }
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest<HTMLElement>('[data-copy-md-url]');
  if (button) copyPageMarkdown(button);
});

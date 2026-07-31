// @ts-check
import { qs, qsa } from './query.js';

class CopyMarkdown {
  constructor(menu) {
    this.menu = menu;
    this.trigger = qs('[data-copy-md-trigger]', menu);
    this.liveRegion = qs('[data-copy-md-live]', menu);

    this.addCopyHandlers();
    this.addListeners();
  }

  announce(btn, message) {
    const labelEl = btn.querySelector('[data-copy-md-text]');
    if (labelEl) {
      const restoreLabel = btn.dataset.copyMdLabel ?? '';
      labelEl.textContent = message;
      setTimeout(() => {
        labelEl.textContent = restoreLabel;
      }, 2000);
    }
    if (this.liveRegion) {
      // Force a content change so AT re-announces a repeated message.
      this.liveRegion.textContent = '';
      setTimeout(() => {
        this.liveRegion.textContent = message;
      }, 50);
    }
  }

  // navigator.clipboard requires a secure context; falls back to
  // execCommand for HTTP and older browsers.
  async writeToClipboard(text) {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function' &&
      (typeof window === 'undefined' || window.isSecureContext !== false)
    ) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('[copy-md] navigator.clipboard failed, falling back', err);
      }
    }

    return this.execCommandCopyFallback(text);
  }

  execCommandCopyFallback(text) {
    if (typeof document === 'undefined') return false;
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      console.warn('[copy-md] execCommand fallback threw', err);
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  async handleCopy(btn) {
    const url = btn.dataset.copyMdUrl;
    const success = btn.dataset.copyMdSuccess ?? '';
    const errorMsg = btn.dataset.copyMdError ?? 'Copy failed';
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
      const ok = await this.writeToClipboard(text);
      if (!ok) throw new Error('clipboard-write-failed');
      this.announce(btn, success);
    } catch (err) {
      console.error('[copy-md] failed:', err);
      this.announce(btn, errorMsg);
    }
  }

  handleKeyboardNavigation(e) {
    if (!this.menu.open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.menu.open = false;
      this.trigger.focus();
    }
  }

  handleOutsideClick(e) {
    if (!this.menu.open) return;
    if (e.target instanceof Node && this.menu.contains(e.target)) return;
    this.menu.open = false;
  }

  addCopyHandlers() {
    for (const btn of qsa('[data-copy-md-action="copy"]', this.menu)) {
      btn.addEventListener('click', () => this.handleCopy(btn));
    }
  }

  addListeners() {
    this.menu.addEventListener('keydown', (e) =>
      this.handleKeyboardNavigation(e)
    );

    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }
}

const copyMarkdownMenus = Array.from(qsa('[data-copy-md-menu]')).map(
  (menu) => new CopyMarkdown(menu)
);

export { copyMarkdownMenus };

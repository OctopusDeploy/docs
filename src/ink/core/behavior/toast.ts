// Minimal, reusable toast. A single shared element announced via role="status" (screen
// readers get it), auto-dismissed. Self-contained, no deps; styling is `.ink-toast` in
// styles/components.css. Pass an `anchor` element to show it right next to where the user acted
// (e.g. the clicked bookmark) instead of the bottom-center fallback.
let el: HTMLElement | null = null;
let label: HTMLElement;
let timer: number | undefined;

function ensure(): void {
  if (el) return;
  el = document.createElement('div');
  el.className = 'ink-toast';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  const icon = document.createElement('span');
  icon.className = 'ink-toast__icon';
  icon.setAttribute('aria-hidden', 'true');
  label = document.createElement('span');
  el.append(icon, label);
  document.body.appendChild(el);
}

export function showToast(message: string, anchor?: Element | null): void {
  ensure();
  const node = el!;
  label.textContent = message;
  node.classList.remove('ink-toast--anchored', 'ink-toast--below');
  node.style.left = '';
  node.style.top = '';
  if (anchor) {
    const r = anchor.getBoundingClientRect();
    const below = r.top < 72; // too close to the top / under the sticky header
    node.classList.add('ink-toast--anchored');
    if (below) node.classList.add('ink-toast--below');
    node.style.left = `${Math.round(r.left + r.width / 2)}px`;
    node.style.top = `${Math.round(below ? r.bottom : r.top)}px`;
  }
  requestAnimationFrame(() => node.classList.add('is-visible'));
  window.clearTimeout(timer);
  timer = window.setTimeout(() => node.classList.remove('is-visible'), 1600);
}

// Copy text to the clipboard, with a legacy fallback for non-secure contexts.
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

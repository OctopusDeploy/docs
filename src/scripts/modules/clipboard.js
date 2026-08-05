// @ts-check

/**
 * Copies text to the clipboard, reporting whether it worked.
 *
 * navigator.clipboard needs a secure context, so this falls back to the
 * deprecated execCommand path for HTTP and older browsers.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function writeToClipboard(text) {
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
      console.warn('[clipboard] navigator.clipboard failed, falling back', err);
    }
  }

  return execCommandCopyFallback(text);
}

/**
 * @param {string} text
 * @returns {boolean}
 */
function execCommandCopyFallback(text) {
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
    console.warn('[clipboard] execCommand fallback threw', err);
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

export { writeToClipboard };

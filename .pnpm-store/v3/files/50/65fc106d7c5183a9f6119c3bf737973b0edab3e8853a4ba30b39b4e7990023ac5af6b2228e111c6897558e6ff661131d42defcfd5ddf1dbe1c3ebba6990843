import window from 'global';
export function browserSupportsCssZoom() {
  try {
    return window.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
}
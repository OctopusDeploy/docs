import window from 'global';
import { ZoomElement as Element } from './ZoomElement';
import { ZoomIFrame as IFrame } from './ZoomIFrame';
export var browserSupportsCssZoom = function browserSupportsCssZoom() {
  try {
    return window.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
};
export var Zoom = {
  Element: Element,
  IFrame: IFrame
};
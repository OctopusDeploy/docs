"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zoom = exports.browserSupportsCssZoom = void 0;

var _global = _interopRequireDefault(require("global"));

var _ZoomElement = require("./ZoomElement");

var _ZoomIFrame = require("./ZoomIFrame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserSupportsCssZoom = function browserSupportsCssZoom() {
  try {
    return _global.default.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
};

exports.browserSupportsCssZoom = browserSupportsCssZoom;
var Zoom = {
  Element: _ZoomElement.ZoomElement,
  IFrame: _ZoomIFrame.ZoomIFrame
};
exports.Zoom = Zoom;
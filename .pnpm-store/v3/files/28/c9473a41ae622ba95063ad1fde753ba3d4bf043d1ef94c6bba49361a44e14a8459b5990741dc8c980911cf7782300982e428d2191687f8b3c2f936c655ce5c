"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePreview = void 0;

var _reactDndPreview = require("react-dnd-preview");

var _common = require("../common");

var usePreview = function usePreview() {
  var enabled = (0, _common.useObservePreviews)();
  var result = (0, _reactDndPreview.usePreview)();

  if (!enabled) {
    return {
      display: false
    };
  }

  return result;
};

exports.usePreview = usePreview;
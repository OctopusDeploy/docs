import "core-js/modules/es.array.map.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { OptionsControl } from './Options';
export default {
  title: 'Controls/Options',
  component: OptionsControl
};
var arrayOptions = ['Bat', 'Cat', 'Rat'];
var objectOptions = {
  A: {
    id: 'Aardvark'
  },
  B: {
    id: 'Bat'
  },
  C: {
    id: 'Cat'
  }
};

var optionsHelper = function optionsHelper(options, type, isMulti) {
  var initial = Array.isArray(options) ? options[1] : options.B;

  var _useState = useState(isMulti ? [initial] : initial),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(OptionsControl, {
    name: "options",
    options: options,
    value: value,
    type: type,
    onChange: function onChange(newVal) {
      return setValue(newVal);
    }
  }), value && Array.isArray(value) ?
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement("ul", null, value && value.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("li", {
      key: idx
    }, JSON.stringify(item));
  })) : /*#__PURE__*/React.createElement("p", null, value ? JSON.stringify(value) : '-'));
}; // Check


export var CheckArray = function CheckArray() {
  return optionsHelper(arrayOptions, 'check', true);
};
export var InlineCheckArray = function InlineCheckArray() {
  return optionsHelper(arrayOptions, 'inline-check', true);
};
export var CheckObject = function CheckObject() {
  return optionsHelper(objectOptions, 'check', true);
};
export var InlineCheckObject = function InlineCheckObject() {
  return optionsHelper(objectOptions, 'inline-check', true);
}; // Radio

export var ArrayRadio = function ArrayRadio() {
  return optionsHelper(arrayOptions, 'radio', false);
};
export var ArrayInlineRadio = function ArrayInlineRadio() {
  return optionsHelper(arrayOptions, 'inline-radio', false);
};
export var ObjectRadio = function ObjectRadio() {
  return optionsHelper(objectOptions, 'radio', false);
};
export var ObjectInlineRadio = function ObjectInlineRadio() {
  return optionsHelper(objectOptions, 'inline-radio', false);
}; // Select

export var ArraySelect = function ArraySelect() {
  return optionsHelper(arrayOptions, 'select', false);
};
export var ArrayMultiSelect = function ArrayMultiSelect() {
  return optionsHelper(arrayOptions, 'multi-select', true);
};
export var ObjectSelect = function ObjectSelect() {
  return optionsHelper(objectOptions, 'select', false);
};
export var ObjectMultiSelect = function ObjectMultiSelect() {
  return optionsHelper(objectOptions, 'multi-select', true);
};
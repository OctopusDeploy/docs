"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _form = require("../form");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var parse = function parse(value, separator) {
  return !value || value.trim() === '' ? [] : value.split(separator);
};

var format = function format(value, separator) {
  return value && Array.isArray(value) ? value.join(separator) : '';
};

var Wrapper = _theming.styled.label({
  display: 'flex'
});

var ArrayControl = function ArrayControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ',' : _ref$separator,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;
  var handleChange = (0, _react.useCallback)(function (e) {
    var newVal = e.target.value;
    onChange(parse(newVal, separator));
  }, [onChange]);
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_form.Form.Textarea, {
    id: name,
    value: format(value, separator),
    onChange: handleChange,
    size: "flex",
    placeholder: "Adjust array dynamically",
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  }));
};

exports.ArrayControl = ArrayControl;
ArrayControl.displayName = "ArrayControl";
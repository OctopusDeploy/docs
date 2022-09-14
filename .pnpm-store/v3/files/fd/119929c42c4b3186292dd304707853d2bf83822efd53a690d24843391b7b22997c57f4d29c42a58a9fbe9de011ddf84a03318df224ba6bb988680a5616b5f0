"use strict";

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _form = require("../form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _theming.styled.label({
  display: 'flex'
});

var format = function format(value) {
  return value || '';
};

var TextControl = function TextControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur;

  var handleChange = function handleChange(event) {
    onChange(event.target.value);
  };

  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_form.Form.Textarea, {
    id: name,
    onChange: handleChange,
    size: "flex",
    placeholder: "Adjust string dynamically",
    name: name,
    value: format(value),
    onFocus: onFocus,
    onBlur: onBlur
  }));
};

exports.TextControl = TextControl;
TextControl.displayName = "TextControl";
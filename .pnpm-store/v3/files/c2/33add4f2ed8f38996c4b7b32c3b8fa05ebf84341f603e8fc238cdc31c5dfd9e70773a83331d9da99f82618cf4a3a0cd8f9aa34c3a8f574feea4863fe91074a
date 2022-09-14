import "core-js/modules/es.function.name.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
var Wrapper = styled.label({
  display: 'flex'
});

var format = function format(value) {
  return value || '';
};

export var TextControl = function TextControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur;

  var handleChange = function handleChange(event) {
    onChange(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, {
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
TextControl.displayName = "TextControl";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.number.is-nan.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
var Wrapper = styled.label({
  display: 'flex'
});
export var parse = function parse(value) {
  var result = parseFloat(value);
  return Number.isNaN(result) ? null : result;
};
export var format = function format(value) {
  return value != null ? String(value) : '';
};
export var NumberControl = function NumberControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var handleChange = function handleChange(event) {
    onChange(parse(event.target.value));
  };

  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Input, {
    type: "number",
    onChange: handleChange,
    size: "flex",
    placeholder: "Adjust number dynamically",
    value: value === null ? undefined : value,
    name: name,
    min: min,
    max: max,
    step: step,
    onFocus: onFocus,
    onBlur: onBlur
  }));
};
NumberControl.displayName = "NumberControl";
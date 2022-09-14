import "core-js/modules/es.array.join.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.trim.js";
import React, { useCallback } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';

var parse = function parse(value, separator) {
  return !value || value.trim() === '' ? [] : value.split(separator);
};

var format = function format(value, separator) {
  return value && Array.isArray(value) ? value.join(separator) : '';
};

var Wrapper = styled.label({
  display: 'flex'
});
export var ArrayControl = function ArrayControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ',' : _ref$separator,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;
  var handleChange = useCallback(function (e) {
    var newVal = e.target.value;
    onChange(parse(newVal, separator));
  }, [onChange]);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, {
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
ArrayControl.displayName = "ArrayControl";
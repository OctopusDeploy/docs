import "core-js/modules/es.function.name.js";
import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@storybook/theming';
var Input = styled.input({
  display: 'table-cell',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  height: 21,
  outline: 'none',
  border: '1px solid #ececec',
  fontSize: '12px',
  color: '#555'
});

var serialize = function serialize(value) {
  return value ? String(value) : null;
};

var deserialize = function deserialize(value) {
  return value === 'true';
};

var BooleanType = function BooleanType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement(Input, {
    id: knob.name,
    name: knob.name,
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: knob.value || false
  });
};

BooleanType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
BooleanType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.bool
  }),
  onChange: PropTypes.func
};
BooleanType.serialize = serialize;
BooleanType.deserialize = deserialize;
export default BooleanType;
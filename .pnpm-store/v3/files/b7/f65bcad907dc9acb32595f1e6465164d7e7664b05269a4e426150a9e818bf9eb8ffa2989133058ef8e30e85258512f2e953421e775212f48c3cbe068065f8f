import "core-js/modules/es.function.name.js";
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from '@storybook/components';

var serialize = function serialize() {
  return undefined;
};

var deserialize = function deserialize() {
  return undefined;
};

var ButtonType = function ButtonType(_ref) {
  var knob = _ref.knob,
      _onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement(Form.Button, {
    type: "button",
    name: knob.name,
    onClick: function onClick() {
      return _onClick(knob);
    }
  }, knob.name);
};

ButtonType.defaultProps = {
  knob: {},
  onClick: function onClick() {}
};
ButtonType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
ButtonType.serialize = serialize;
ButtonType.deserialize = deserialize;
export default ButtonType;
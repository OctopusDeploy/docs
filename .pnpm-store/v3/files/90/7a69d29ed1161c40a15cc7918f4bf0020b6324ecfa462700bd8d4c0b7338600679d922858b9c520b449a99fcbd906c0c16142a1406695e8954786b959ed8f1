import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.string.includes.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { styled } from '@storybook/theming';
import RadiosType from './Radio';
import CheckboxesType from './Checkboxes'; // TODO: Apply the Storybook theme to react-select

var OptionsSelect = styled(ReactSelect)({
  width: '100%',
  maxWidth: '300px',
  color: 'black'
});

var serialize = function serialize(value) {
  return value;
};

var deserialize = function deserialize(value) {
  return value;
};

var OptionsType = function OptionsType(props) {
  var knob = props.knob,
      onChange = props.onChange;
  var display = knob.optionsObj.display;

  if (display === 'check' || display === 'inline-check') {
    var isInline = display === 'inline-check';
    return /*#__PURE__*/React.createElement(CheckboxesType, _extends({}, props, {
      isInline: isInline
    }));
  }

  if (display === 'radio' || display === 'inline-radio') {
    var _isInline = display === 'inline-radio';

    return /*#__PURE__*/React.createElement(RadiosType, _extends({}, props, {
      isInline: _isInline
    }));
  }

  if (display === 'select' || display === 'multi-select') {
    var options = Object.keys(knob.options).map(function (key) {
      return {
        value: knob.options[key],
        label: key
      };
    });
    var isMulti = display === 'multi-select';
    var optionsIndex = options.findIndex(function (i) {
      return i.value === knob.value;
    });
    var defaultValue = options[optionsIndex];

    var handleChange = function handleChange(e) {
      return onChange(e.value);
    };

    if (isMulti) {
      defaultValue = options.filter(function (i) {
        return knob.value.includes(i.value);
      });

      handleChange = function handleChange(values) {
        return onChange(values.map(function (item) {
          return item.value;
        }));
      };
    }

    return /*#__PURE__*/React.createElement(OptionsSelect, {
      value: defaultValue,
      options: options,
      isMulti: isMulti,
      onChange: handleChange
    });
  }

  return null;
};

OptionsType.defaultProps = {
  knob: {},
  display: 'select',
  onChange: function onChange(value) {
    return value;
  }
};
OptionsType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.object
  }),
  display: PropTypes.oneOf(['radio', 'inline-radio', 'check', 'inline-check', 'select', 'multi-select']),
  onChange: PropTypes.func
};
OptionsType.serialize = serialize;
OptionsType.deserialize = deserialize;
export default OptionsType;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.number.is-nan.js";
import "core-js/modules/es.object.get-prototype-of.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '@storybook/components';
var RangeInput = styled.input({
  boxSizing: 'border-box',
  height: 25,
  outline: 'none',
  border: '1px solid #f7f4f4',
  borderRadius: 2,
  fontSize: 11,
  padding: 5,
  color: '#444'
}, {
  display: 'table-cell',
  flexGrow: 1
});
var RangeLabel = styled.span({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
  whiteSpace: 'nowrap'
});
var RangeWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

var NumberType = /*#__PURE__*/function (_Component) {
  _inherits(NumberType, _Component);

  var _super = _createSuper(NumberType);

  function NumberType() {
    var _this;

    _classCallCheck(this, NumberType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;
      var parsedValue = Number(value);

      if (Number.isNaN(parsedValue) || value === '') {
        parsedValue = null;
      }

      onChange(parsedValue);
    };

    return _this;
  }

  _createClass(NumberType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return knob.range ? /*#__PURE__*/React.createElement(RangeWrapper, null, /*#__PURE__*/React.createElement(RangeLabel, null, knob.min), /*#__PURE__*/React.createElement(RangeInput, {
        value: knob.value,
        type: "range",
        name: knob.name,
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement(RangeLabel, null, "".concat(knob.value, " / ").concat(knob.max))) : /*#__PURE__*/React.createElement(Form.Input, {
        value: knob.value,
        type: "number",
        name: knob.name,
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }]);

  return NumberType;
}(Component);

NumberType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    range: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  }).isRequired,
  onChange: PropTypes.func.isRequired
};
NumberType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};

NumberType.serialize = function (value) {
  return value === null || value === undefined ? '' : String(value);
};

NumberType.deserialize = function (value) {
  return value === '' ? null : parseFloat(value);
};

export { NumberType as default };
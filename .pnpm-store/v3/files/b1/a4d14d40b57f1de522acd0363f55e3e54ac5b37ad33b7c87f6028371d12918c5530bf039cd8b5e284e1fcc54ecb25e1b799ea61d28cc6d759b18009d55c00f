function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Form } from '@storybook/components';
var FlexSpaced = styled.div({
  flex: 1,
  display: 'flex',
  '&& > *': {
    marginLeft: 10
  },
  '&& > *:first-of-type': {
    marginLeft: 0
  }
});
var FlexInput = styled(Form.Input)({
  flex: 1
});

var formatDate = function formatDate(date) {
  var year = "000".concat(date.getFullYear()).slice(-4);
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var formatTime = function formatTime(date) {
  var hours = "0".concat(date.getHours()).slice(-2);
  var minutes = "0".concat(date.getMinutes()).slice(-2);
  return "".concat(hours, ":").concat(minutes);
};

var DateType = /*#__PURE__*/function (_Component) {
  _inherits(DateType, _Component);

  var _super = _createSuper(DateType);

  function DateType() {
    var _this;

    _classCallCheck(this, DateType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      valid: undefined
    };

    _this.onDateChange = function (e) {
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;

      var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state;

      var valid = false;

      var _e$target$value$split = e.target.value.split('-'),
          _e$target$value$split2 = _slicedToArray(_e$target$value$split, 3),
          year = _e$target$value$split2[0],
          month = _e$target$value$split2[1],
          day = _e$target$value$split2[2];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));

        if (result.getTime()) {
          valid = true;
          onChange(result.getTime());
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    };

    _this.onTimeChange = function (e) {
      var _this$props2 = _this.props,
          knob = _this$props2.knob,
          onChange = _this$props2.onChange;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          state = _assertThisInitialize2.state;

      var valid = false;

      var _e$target$value$split3 = e.target.value.split(':'),
          _e$target$value$split4 = _slicedToArray(_e$target$value$split3, 2),
          hours = _e$target$value$split4[0],
          minutes = _e$target$value$split4[1];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setHours(parseInt(hours, 10));
        result.setMinutes(parseInt(minutes, 10));

        if (result.getTime()) {
          onChange(result.getTime());
          valid = true;
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    };

    _this.dateInput = void 0;
    _this.timeInput = void 0;
    return _this;
  }

  _createClass(DateType, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var knob = this.props.knob;
      var valid = this.state.valid;
      var value = new Date(knob.value);

      if (valid !== false) {
        this.dateInput.value = formatDate(value);
        this.timeInput.value = formatTime(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var name = knob.name;
      var valid = this.state.valid;
      return name ? /*#__PURE__*/React.createElement(FlexSpaced, {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(FlexInput, {
        type: "date",
        max: "9999-12-31" // I do this because of a rendering bug in chrome
        ,
        ref: function ref(el) {
          _this2.dateInput = el;
        },
        id: "".concat(name, "date"),
        name: "".concat(name, "date"),
        onChange: this.onDateChange
      }), /*#__PURE__*/React.createElement(FlexInput, {
        type: "time",
        id: "".concat(name, "time"),
        name: "".concat(name, "time"),
        ref: function ref(el) {
          _this2.timeInput = el;
        },
        onChange: this.onTimeChange
      }), !valid ? /*#__PURE__*/React.createElement("div", null, "invalid") : null) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {
      return {
        valid: true
      };
    }
  }]);

  return DateType;
}(Component);

DateType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
DateType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number
  }),
  onChange: PropTypes.func
};

DateType.serialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};

DateType.deserialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};

export { DateType as default };
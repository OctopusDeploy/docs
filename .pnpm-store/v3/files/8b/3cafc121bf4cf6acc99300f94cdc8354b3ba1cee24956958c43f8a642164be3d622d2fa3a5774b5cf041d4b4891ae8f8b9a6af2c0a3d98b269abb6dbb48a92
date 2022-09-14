"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CheckboxesWrapper = _theming.styled.div(function (_ref) {
  var isInline = _ref.isInline;
  return isInline ? {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '> * + *': {
      marginLeft: 10
    }
  } : {};
});

var CheckboxFieldset = _theming.styled.fieldset({
  border: 0,
  padding: 0,
  margin: 0
});

var CheckboxLabel = _theming.styled.label({
  padding: '3px 0 3px 5px',
  lineHeight: '18px',
  display: 'inline-block'
});

var CheckboxesType = /*#__PURE__*/function (_Component) {
  _inherits(CheckboxesType, _Component);

  var _super = _createSuper(CheckboxesType);

  function CheckboxesType(props) {
    var _this;

    _classCallCheck(this, CheckboxesType);

    _this = _super.call(this, props);

    _this.handleChange = function (e) {
      var onChange = _this.props.onChange;
      var currentValue = e.target.value;
      var values = _this.state.values;

      if (values.includes(currentValue)) {
        values.splice(values.indexOf(currentValue), 1);
      } else {
        values.push(currentValue);
      }

      _this.setState({
        values: values
      });

      onChange(values);
    };

    _this.renderCheckboxList = function (_ref2) {
      var options = _ref2.options;
      return Object.keys(options).map(function (key) {
        return _this.renderCheckbox(key, options[key]);
      });
    };

    _this.renderCheckbox = function (label, value) {
      var knob = _this.props.knob;
      var name = knob.name;
      var id = "".concat(name, "-").concat(value);
      var values = _this.state.values;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: id
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "checkbox",
        id: id,
        name: name,
        value: value,
        onChange: _this.handleChange,
        checked: values.includes(value)
      }), /*#__PURE__*/_react.default.createElement(CheckboxLabel, {
        htmlFor: id
      }, label));
    };

    var _knob = props.knob;
    _this.state = {
      values: _knob.defaultValue || []
    };
    return _this;
  }

  _createClass(CheckboxesType, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          knob = _this$props.knob,
          isInline = _this$props.isInline;
      return /*#__PURE__*/_react.default.createElement(CheckboxFieldset, null, /*#__PURE__*/_react.default.createElement(CheckboxesWrapper, {
        isInline: isInline
      }, this.renderCheckboxList(knob)));
    }
  }]);

  return CheckboxesType;
}(_react.Component);

exports.default = CheckboxesType;
CheckboxesType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  },
  isInline: false
};
CheckboxesType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.array,
    options: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
  }),
  onChange: _propTypes.default.func,
  isInline: _propTypes.default.bool
};

CheckboxesType.serialize = function (value) {
  return value;
};

CheckboxesType.deserialize = function (value) {
  return value;
};
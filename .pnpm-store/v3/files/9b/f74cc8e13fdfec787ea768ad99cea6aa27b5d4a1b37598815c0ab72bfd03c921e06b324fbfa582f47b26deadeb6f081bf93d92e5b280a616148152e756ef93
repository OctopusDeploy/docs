"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKnobControl = exports.default = void 0;

var _Text = _interopRequireDefault(require("./Text"));

var _Number = _interopRequireDefault(require("./Number"));

var _Color = _interopRequireDefault(require("./Color"));

var _Boolean = _interopRequireDefault(require("./Boolean"));

var _Object = _interopRequireDefault(require("./Object"));

var _Select = _interopRequireDefault(require("./Select"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _Array = _interopRequireDefault(require("./Array"));

var _Date = _interopRequireDefault(require("./Date"));

var _Button = _interopRequireDefault(require("./Button"));

var _Files = _interopRequireDefault(require("./Files"));

var _Options = _interopRequireDefault(require("./Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KnobControls = {
  text: _Text.default,
  number: _Number.default,
  color: _Color.default,
  boolean: _Boolean.default,
  object: _Object.default,
  select: _Select.default,
  radios: _Radio.default,
  array: _Array.default,
  date: _Date.default,
  button: _Button.default,
  files: _Files.default,
  options: _Options.default
};
var _default = KnobControls;
exports.default = _default;

// Note: this is a utility function that helps in resolving types more orderly
var getKnobControl = function getKnobControl(type) {
  return KnobControls[type];
};

exports.getKnobControl = getKnobControl;
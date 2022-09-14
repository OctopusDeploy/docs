"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _usePreview2 = require("./usePreview");

var _Context = require("./Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Preview = function Preview(props) {
  var _usePreview = (0, _usePreview2.usePreview)(),
      display = _usePreview.display,
      data = _objectWithoutProperties(_usePreview, ["display"]);

  if (!display) {
    return null;
  }

  var child;

  if (props.children && typeof props.children === 'function') {
    child = props.children(data);
  } else if (props.children) {
    child = props.children;
  } else {
    child = props.generator(data);
  }

  return /*#__PURE__*/_react.default.createElement(_Context.Context.Provider, {
    value: data
  }, child);
};

exports.Preview = Preview;
Preview.propTypes = {
  generator: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func])
};
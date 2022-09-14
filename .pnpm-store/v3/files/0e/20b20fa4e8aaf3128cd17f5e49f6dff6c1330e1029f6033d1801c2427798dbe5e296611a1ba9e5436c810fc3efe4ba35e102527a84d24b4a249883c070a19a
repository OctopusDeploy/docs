function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { usePreview } from './usePreview';
import { Context } from './Context';

var Preview = function Preview(props) {
  var _usePreview = usePreview(),
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

  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: data
  }, child);
};

Preview.propTypes = {
  generator: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
export { Preview };
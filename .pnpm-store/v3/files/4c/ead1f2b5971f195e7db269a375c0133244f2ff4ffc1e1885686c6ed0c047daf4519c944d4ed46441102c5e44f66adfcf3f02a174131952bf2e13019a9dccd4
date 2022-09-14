function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DndProvider as ReactDndProvider } from 'react-dnd';
import MultiBackend from 'dnd-multi-backend';
export var PreviewPortalContext = React.createContext(null);
export var DndProvider = function DndProvider(props) {
  var previewPortal = useRef();
  return /*#__PURE__*/React.createElement(PreviewPortalContext.Provider, {
    value: previewPortal.current
  }, /*#__PURE__*/React.createElement(ReactDndProvider, _extends({
    backend: MultiBackend
  }, props)), /*#__PURE__*/React.createElement("div", {
    ref: previewPortal
  }));
};
DndProvider.propTypes = {
  manager: PropTypes.any,
  context: PropTypes.any,
  options: PropTypes.any,
  debugMode: PropTypes.bool
};
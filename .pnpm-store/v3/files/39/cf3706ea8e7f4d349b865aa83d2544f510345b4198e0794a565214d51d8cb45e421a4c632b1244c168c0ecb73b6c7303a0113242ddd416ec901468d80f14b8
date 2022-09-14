import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import DnDPreview, { Context as PreviewContext } from 'react-dnd-preview';
import { useObservePreviews } from '../common';
import { PreviewPortalContext } from './DndProvider';

var Preview = function Preview(props) {
  var enabled = useObservePreviews();
  var portal = useContext(PreviewPortalContext);

  if (!enabled) {
    return null;
  }

  var result = /*#__PURE__*/React.createElement(DnDPreview, props);

  if (portal) {
    return ReactDOM.createPortal(result, portal);
  }

  return result;
};

Preview.Context = PreviewContext;
Preview.propTypes = DnDPreview.propTypes;
export { Preview, PreviewContext };
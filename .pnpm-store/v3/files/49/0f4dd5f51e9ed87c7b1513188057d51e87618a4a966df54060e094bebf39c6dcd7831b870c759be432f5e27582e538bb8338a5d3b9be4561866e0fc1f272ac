import { usePreview as usePreviewDnd } from 'react-dnd-preview';
import { useObservePreviews } from '../common';

var usePreview = function usePreview() {
  var enabled = useObservePreviews();
  var result = usePreviewDnd();

  if (!enabled) {
    return {
      display: false
    };
  }

  return result;
};

export { usePreview };
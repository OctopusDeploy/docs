import { useDragLayer } from 'react-dnd';

var getStyle = function getStyle(currentOffset) {
  var transform = "translate(".concat(currentOffset.x, "px, ").concat(currentOffset.y, "px)");
  return {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    transform: transform,
    WebkitTransform: transform
  };
};

var usePreview = function usePreview() {
  var collectedProps = useDragLayer(function (monitor) {
    return {
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      itemType: monitor.getItemType(),
      item: monitor.getItem()
    };
  });

  if (!collectedProps.isDragging || collectedProps.currentOffset === null) {
    return {
      display: false
    };
  }

  return {
    display: true,
    itemType: collectedProps.itemType,
    item: collectedProps.item,
    style: getStyle(collectedProps.currentOffset)
  };
};

export { usePreview };
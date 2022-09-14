'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hotkeys = _interopDefault(require('hotkeys-js'));
var react = require('react');

function useIsHotkeyPressed() {
  return hotkeys.isPressed;
}

function useHotkeys(keys, callback, options, deps) {
  if (options instanceof Array) {
    deps = options;
    options = undefined;
  }

  const {
    enableOnTags,
    filter
  } = options || {};
  const ref = react.useRef(null);
  const memoisedCallback = react.useCallback((keyboardEvent, hotkeysEvent) => {
    if (ref.current === null || document.activeElement === ref.current) {
      callback(keyboardEvent, hotkeysEvent);
      return true;
    }

    return false;
  }, deps ? [ref, ...deps] : [ref]);
  react.useEffect(() => {
    if (options && options.enableOnTags) {
      hotkeys.filter = ({
        target,
        srcElement
      }) => {
        // @ts-ignore
        const targetTagName = target && target.tagName || srcElement && srcElement.tagName;
        return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName));
      };
    }

    if (filter) hotkeys.filter = filter;
    hotkeys(keys, options || {}, memoisedCallback);
    return () => hotkeys.unbind(keys, memoisedCallback);
  }, [memoisedCallback, options, enableOnTags, filter, keys]);
  return ref;
}

exports.useHotkeys = useHotkeys;
exports.useIsHotkeyPressed = useIsHotkeyPressed;
//# sourceMappingURL=index.js.map

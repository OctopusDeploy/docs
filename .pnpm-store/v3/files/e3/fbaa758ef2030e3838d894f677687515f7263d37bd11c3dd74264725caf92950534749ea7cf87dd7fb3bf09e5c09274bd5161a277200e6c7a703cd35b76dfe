import hotkeys from "hotkeys-js";
import { useCallback, useEffect, useRef } from "react";
export function useHotkeys(keys, callback, options, deps) {
    if (options instanceof Array) {
        deps = options;
        options = undefined;
    }
    const { enableOnTags, filter } = options || {};
    const ref = useRef(null);
    const memoisedCallback = useCallback((keyboardEvent, hotkeysEvent) => {
        if (ref.current === null || document.activeElement === ref.current) {
            callback(keyboardEvent, hotkeysEvent);
            return true;
        }
        return false;
    }, deps ? [ref, ...deps] : [ref]);
    useEffect(() => {
        if (options && options.enableOnTags) {
            hotkeys.filter = ({ target, srcElement }) => {
                // @ts-ignore
                const targetTagName = (target && target.tagName) || (srcElement && srcElement.tagName);
                return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName));
            };
        }
        if (filter)
            hotkeys.filter = filter;
        hotkeys(keys, options || {}, memoisedCallback);
        return () => hotkeys.unbind(keys, memoisedCallback);
    }, [memoisedCallback, options, enableOnTags, filter, keys]);
    return ref;
}

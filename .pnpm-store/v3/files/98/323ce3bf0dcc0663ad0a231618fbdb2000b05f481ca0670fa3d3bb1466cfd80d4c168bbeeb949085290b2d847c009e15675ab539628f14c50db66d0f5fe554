import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match.js";
export default function pathToId(path) {
  var match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error("Invalid path '".concat(path, "',  must start with '/story/'"));
  }

  return match[1];
}
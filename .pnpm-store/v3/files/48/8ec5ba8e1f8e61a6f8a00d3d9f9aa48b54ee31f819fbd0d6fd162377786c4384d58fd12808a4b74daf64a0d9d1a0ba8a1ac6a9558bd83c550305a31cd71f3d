/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import rAF from 'raf';

var getTime = Date.now ||
/* istanbul ignore next */function () {
  return new Date().getTime();
};

function rAFThrottle(func) {
  var throttle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;

  var context = void 0;
  var args = void 0;
  var last = 0;
  var requestId = 0;

  var later = function later() {
    var now = getTime();
    var remaining = throttle - (now - last);

    if (remaining <= 0) {
      last = now;
      requestId = 0;
      func.apply(context, args);
    } else {
      requestId = rAF(later);
    }
  };

  return function throttledFunc() {
    context = this;
    args = arguments; // eslint-disable-line prefer-rest-params

    if (!requestId) {
      requestId = rAF(later);
    }
  };
}

export default rAFThrottle;

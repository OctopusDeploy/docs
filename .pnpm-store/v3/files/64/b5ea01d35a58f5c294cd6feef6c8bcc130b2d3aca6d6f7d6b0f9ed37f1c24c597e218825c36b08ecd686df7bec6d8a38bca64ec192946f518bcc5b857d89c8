/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global navigator, parseFloat */

// less then or equal to IE8
var leIE8 = false; // eslint-disable-line import/no-mutable-exports

if (typeof navigator !== 'undefined') {
  var matches = navigator.userAgent.match(/MSIE (\d+\.\d+)/);
  if (matches) {
    leIE8 = parseFloat(matches[1], 10) < 9;
  }
}

export default leIE8;

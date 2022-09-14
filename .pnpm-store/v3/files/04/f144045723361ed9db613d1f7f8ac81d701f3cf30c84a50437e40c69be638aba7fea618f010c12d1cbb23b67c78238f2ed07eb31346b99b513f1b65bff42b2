'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globalVars = require('./globalVars');

var _globalVars2 = _interopRequireDefault(_globalVars);

var _leIE = require('./lib/leIE8');

var _leIE2 = _interopRequireDefault(_leIE);

var _mainEventConnectors = require('./mainEventConnectors');

var _mainEventConnectors2 = _interopRequireDefault(_mainEventConnectors);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Subscribe to UI events.
 * @method subscribe
 * @param {String} type - The type of event.
 * @param {Function} cb - The callback function.
 * @param {Object} options.context - The caller.
 * @param {Number} options.throttleRate - The amount of time for throttling.
 * @param {Boolean} options.useRAF - Use rAF for throttling if true.
 * @param {Object} options.eventOptions - Option to pass to event listener
 * @return {Object} The object with unsubscribe function.
 */
// less then or equal to IE8
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

function subscribe(type, cb) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var useRAF = options.useRAF || false;
  var throttleRate = parseInt(options.throttleRate, 10);
  var eventOptions = options.eventOptions;

  if (isNaN(throttleRate)) {
    throttleRate = _constants.DEFAULT_THROTTLE_RATE;
  }

  if (useRAF) {
    throttleRate = 'raf';
  }

  // turn off throttle if the browser is IE8 or less, because window.event will be reset
  // when using any delayed function, i.g., setTimeout, or rAF.
  if (_leIE2.default) {
    throttleRate = 0;
  }

  // once those variables enabled, then never disabled.
  _globalVars2.default.enableScrollInfo = _globalVars2.default.enableScrollInfo || options.enableScrollInfo || false;
  _globalVars2.default.enableResizeInfo = _globalVars2.default.enableResizeInfo || options.enableResizeInfo || false;
  _globalVars2.default.enableTouchInfo = _globalVars2.default.enableTouchInfo || options.enableTouchInfo || false;

  return _mainEventConnectors2.default[type](throttleRate, cb, options, eventOptions);
}

// constants
exports.default = subscribe;
module.exports = exports['default'];

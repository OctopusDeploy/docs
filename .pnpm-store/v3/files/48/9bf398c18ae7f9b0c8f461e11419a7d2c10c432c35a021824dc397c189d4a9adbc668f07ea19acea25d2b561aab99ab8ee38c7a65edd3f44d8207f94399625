'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _globalVars = require('../globalVars');

var _globalVars2 = _interopRequireDefault(_globalVars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var supportPassiveEvent = _globalVars2.default.supportPassiveEvent;


var defaultEventOption = {
  capture: false,
  passive: false
};

/**
 * Cross-browser addEventListener.
 * @method listen
 * @param {Object} target - The target to add event listener.
 * @param {String} eventType - The event type.
 * @param {Function} handler - The event handler.
 * @param {Object} handler - The options object that specifies
 * characteristics about the event listener.
 * @return {Object} The object to be able to remove the handler.
 */
function listen(target, eventType, handler, options) {
  var add = 'addEventListener';
  var _remove = 'removeEventListener';
  var type = eventType;

  var eventOptions = supportPassiveEvent ? (0, _assign2.default)({}, defaultEventOption, options) : false;

  if (!target.addEventListener && target.attachEvent) {
    add = 'attachEvent';
    _remove = 'detachEvent';
    type = 'on' + eventType;
  }
  target[add](type, handler, eventOptions);

  return {
    remove: function remove() {
      target[_remove](eventType, handler);
    }
  };
}

exports.default = listen;
module.exports = exports['default'];

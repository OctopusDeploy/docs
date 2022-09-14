'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globalVars = require('./globalVars');

var _globalVars2 = _interopRequireDefault(_globalVars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removers = _globalVars2.default.removers;

/**
 * Unsubscribe to UI events.
 * @method unsubscribe
 * @param {String} type - The type of event.
 * @param {Function} cb - The callback function.
 */
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

function unsubscribe(type, cb) {
  var remover = void 0;
  for (var i = removers.length - 1; i >= 0; i -= 1) {
    remover = removers[i];
    if (remover._cb === cb && remover._type.indexOf(type) >= 0) {
      remover.unsubscribe();
      removers.splice(i, 1);
    }
  }
}

exports.default = unsubscribe;
module.exports = exports['default'];

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _AugmentedEvent = require('./AugmentedEvent');

var _AugmentedEvent2 = _interopRequireDefault(_AugmentedEvent);

var _globalVars = require('./globalVars');

var _globalVars2 = _interopRequireDefault(_globalVars);

var _leIE = require('./lib/leIE8');

var _leIE2 = _interopRequireDefault(_leIE);

var _listen = require('./lib/listen');

var _listen2 = _interopRequireDefault(_listen);

var _rAFThrottle = require('./lib/rAFThrottle');

var _rAFThrottle2 = _interopRequireDefault(_rAFThrottle);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connections = _globalVars2.default.connections,
    EE = _globalVars2.default.EE,
    listeners = _globalVars2.default.listeners,
    removers = _globalVars2.default.removers;

// global variables


// constants
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global window, document, setTimeout */

var doc = void 0;
var win = void 0;
var body = void 0;
var hashId = 0;

if (typeof window !== 'undefined') {
  win = window;
  doc = win.document || document;
  body = doc.body;
}

function getHash(domNode) {
  return domNode.id || 'target-id-' + hashId++; // eslint-disable-line
}

/**
 * Connect a throttled event to a throttled main event, and return an event remover.
 * The number of connections to a throttled main event will be kept. If all throttled events
 * are removed, then remove throttled main event.
 * @method connectThrottle
 * @param {String} throttledEvent - A throttled event
 * @param {Function} cb - Callback function
 * @param {Object} ctx - The "this"
 * @param {String} throttledMainEvent - A throttled main event
 * @return {Object} An event remover
 */
function connectThrottle(throttledEvent, cb, ctx, throttledMainEvent) {
  EE.on(throttledEvent, cb || _noop2.default, ctx);
  throttledMainEvent = throttledMainEvent || throttledEvent;
  connections[throttledMainEvent] = (connections[throttledMainEvent] || 0) + 1;
  return {
    _type: throttledEvent,
    _cb: cb,
    _ctx: ctx,
    unsubscribe: function unsubscribe() {
      if (!this._type) {
        return;
      }

      EE.removeListener(throttledEvent, cb, ctx);
      connections[throttledMainEvent]--;
      if (connections[throttledMainEvent] === 0) {
        listeners[throttledMainEvent].remove();
        listeners[throttledMainEvent] = undefined;
      }

      this._type = undefined;
      this._cb = undefined;
      this._ctx = undefined;

      // remove the remover from removers array
      for (var i = removers.length - 1; i >= 0; i--) {
        var remover = removers[i];
        if (remover === this) {
          removers.splice(i, 1);
          break;
        }
      }
    }
  };
}

/**
 * Connect to event, event start and event end.
 * @method connectContinuousEvent
 * @param {Object} target - The target of a main event, window or document.
 * @param {String} mainEvent - A browser event, like scroll or resize.
 * @param {String} event - A subscribe event.
 * @param {Object} eventOptions - An options pass to event listener
 */
function connectContinuousEvent(target, mainEvent, event) {
  return function throttleEvent(throttleRate, cb, options, eventOptions) {
    var context = options.context;
    var domTarget = options.target;
    var domId = domTarget && getHash(domTarget);
    var targetPart = domId ? ':' + domId : '';

    var throttledStartEvent = mainEvent + 'Start:' + throttleRate + targetPart;
    var throttledEndEvent = mainEvent + 'End:' + throttleRate + targetPart;
    var throttledMainEvent = mainEvent + ':' + throttleRate + targetPart;
    var throttledEvent = event + ':' + throttleRate + targetPart;

    var remover = connectThrottle(throttledEvent, cb, context, throttledMainEvent);
    removers.push(remover);

    if (listeners[throttledMainEvent]) {
      return remover;
    }

    var ae = {
      start: new _AugmentedEvent2.default({ mainType: mainEvent, subType: 'start' }), // start
      main: new _AugmentedEvent2.default({ mainType: mainEvent }), // main
      end: new _AugmentedEvent2.default({ mainType: mainEvent, subType: 'end' })
    };

    // No throttle for throttleRate = 0
    // end
    if (throttleRate === 'raf') {
      throttleRate = 16; // Set as a number for setTimeout later.
      handler = (0, _rAFThrottle2.default)(handler);
    } else if (throttleRate > 0) {
      handler = (0, _throttle2.default)(handler, throttleRate);
    }

    var timer = void 0;
    function endCallback(e) {
      ae.end.update(e);
      EE.emit(throttledEndEvent, e, ae.end);
      timer = null;
    }
    function handler(e) {
      if (!timer) {
        ae.start.update(e);
        EE.emit(throttledStartEvent, e, ae.start);
      }
      clearTimeout(timer);

      ae.main.update(e);
      EE.emit(throttledMainEvent, e, ae.main);
      if (!_leIE2.default) {
        timer = setTimeout(endCallback.bind(null, e), throttleRate + _constants.EVENT_END_DELAY);
      } else {
        // For browser less then and equal to IE8, event object need to be cloned for setTimeout.
        timer = setTimeout(function () {
          endCallback((0, _clone2.default)(e));
        }, throttleRate + _constants.EVENT_END_DELAY);
      }
    }

    listeners[throttledMainEvent] = (0, _listen2.default)(domTarget || target, mainEvent, handler, eventOptions);
    return remover;
  };
}

function connectDiscreteEvent(target, event) {
  return function throttleEvent(throttleRate, cb, options, eventOptions) {
    var context = options.context;
    var domTarget = options.target;
    var domId = domTarget && getHash(domTarget);

    // no throttling for discrete event
    var throttledEvent = event + ':0' + (domId ? ':' + domId : '');

    var remover = connectThrottle(throttledEvent, cb, context);
    removers.push(remover);

    if (listeners[throttledEvent]) {
      return remover;
    }

    var ae = new _AugmentedEvent2.default({ mainType: event });

    function handler(e) {
      ae.update(e);
      EE.emit(throttledEvent, e, ae);
    }

    listeners[throttledEvent] = (0, _listen2.default)(domTarget || target, event, handler, eventOptions);
    return remover;
  };
}

exports.default = {
  scrollStart: connectContinuousEvent(win, 'scroll', 'scrollStart'),
  scrollEnd: connectContinuousEvent(win, 'scroll', 'scrollEnd'),
  scroll: connectContinuousEvent(win, 'scroll', 'scroll'),
  resizeStart: connectContinuousEvent(win, 'resize', 'resizeStart'),
  resizeEnd: connectContinuousEvent(win, 'resize', 'resizeEnd'),
  resize: connectContinuousEvent(win, 'resize', 'resize'),
  visibilitychange: connectDiscreteEvent(doc, 'visibilitychange'),
  touchmoveStart: connectContinuousEvent(body, 'touchmove', 'touchmoveStart'),
  touchmoveEnd: connectContinuousEvent(body, 'touchmove', 'touchmoveEnd'),
  touchmove: connectContinuousEvent(body, 'touchmove', 'touchmove'),
  touchstart: connectDiscreteEvent(body, 'touchstart'),
  touchend: connectDiscreteEvent(body, 'touchend')
};
module.exports = exports['default'];

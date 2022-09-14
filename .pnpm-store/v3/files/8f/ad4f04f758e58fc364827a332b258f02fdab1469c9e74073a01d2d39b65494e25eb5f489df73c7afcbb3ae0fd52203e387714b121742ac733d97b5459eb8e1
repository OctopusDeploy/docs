'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2015, Yahoo! Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/* global window, document */

var _globalVars = require('./globalVars');

var _globalVars2 = _interopRequireDefault(_globalVars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var resize = { // eslint-disable-line prefer-const
  width: 0,
  height: 0
};
var scroll = { // eslint-disable-line prefer-const
  delta: 0,
  top: 0
};
var touch = { // eslint-disable-line prefer-const
  axisIntention: '',
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0
};

var INTENTION_THRESHOLD = 5;

var getXY = function getXY(pos) {
  var t = { x: 0, y: 0 }; // eslint-disable-line prefer-const
  var docBody = document.body;
  var docEl = document.documentElement;

  if (pos.pageX || pos.pageY) {
    t.x = pos.pageX;
    t.y = pos.pageY;
  } else {
    t.x = pos.clientX + docBody.scrollLeft + docEl.scrollLeft;
    t.y = pos.clientY + docBody.scrollTop + docEl.scrollTop;
  }

  return t;
};

/**
 * ArgmentedEvent will hold some global information, such like window scroll postion,
 * so that those information is only calculated once.
 * @param {Object} option - The option for SyntheticEvent
 */

var AugmentedEvent = function () {
  function AugmentedEvent() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AugmentedEvent);

    var mainType = (option.mainType || '').toLowerCase();
    var subType = (option.subType || '').toLowerCase();

    this.mainType = mainType;
    this.subType = subType;
    this.type = mainType + subType.charAt(0).toUpperCase() + subType.slice(1) || '';
    this.scroll = scroll;
    this.resize = resize;
    this.touch = touch;
  }

  _createClass(AugmentedEvent, [{
    key: 'update',
    value: function update(e) {
      var mainType = this.mainType,
          subType = this.subType;

      var docEl = document.documentElement;

      if (_globalVars2.default.enableScrollInfo && (mainType === 'scroll' || mainType === 'touchmove')) {
        var top = docEl.scrollTop + document.body.scrollTop;
        // Prevent delta from being 0
        if (top !== this.scroll.top) {
          this.scroll.delta = top - this.scroll.top;
          this.scroll.top = top;
        }
      }
      if (_globalVars2.default.enableResizeInfo && mainType === 'resize') {
        this.resize.width = window.innerWidth || docEl.clientWidth;
        this.resize.height = window.innerHeight || docEl.clientHeight;
      }
      if (_globalVars2.default.enableTouchInfo && e.touches && (mainType === 'touchstart' || mainType === 'touchmove' || mainType === 'touchend')) {
        var pos = void 0;
        var absX = void 0;
        var absY = void 0;
        if (mainType === 'touchstart' || subType === 'start') {
          pos = getXY(e.touches[0]);
          this.touch.axisIntention = '';
          this.touch.startX = pos.x;
          this.touch.startY = pos.y;
          this.touch.deltaX = 0;
          this.touch.deltaY = 0;
        } else if (mainType === 'touchmove') {
          pos = getXY(e.touches[0]);
          this.touch.deltaX = pos.x - this.touch.startX;
          this.touch.deltaY = pos.y - this.touch.startY;
          if (this.touch.axisIntention === '') {
            absX = Math.abs(this.touch.deltaX);
            absY = Math.abs(this.touch.deltaY);
            if (absX > INTENTION_THRESHOLD && absX >= absY) {
              this.touch.axisIntention = 'x';
            } else if (absY > INTENTION_THRESHOLD && absY > absX) {
              this.touch.axisIntention = 'y';
            }
          }
        }
      }
    }
  }]);

  return AugmentedEvent;
}();

exports.default = AugmentedEvent;
module.exports = exports['default'];

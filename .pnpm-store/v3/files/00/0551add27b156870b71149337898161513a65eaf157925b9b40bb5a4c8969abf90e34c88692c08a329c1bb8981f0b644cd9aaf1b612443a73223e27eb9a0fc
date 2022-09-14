"use strict";

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.some.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.replace.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _global = require("global");

var _escapeHtml = _interopRequireDefault(require("escape-html"));

var _clientApi = require("@storybook/client-api");

var _KnobStore = _interopRequireDefault(require("./KnobStore"));

var _shared = require("./shared");

var _converters = require("./converters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var knobValuesFromUrl = Object.entries((0, _clientApi.getQueryParams)()).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  if (k.includes('knob-')) {
    return Object.assign({}, acc, _defineProperty({}, k.replace('knob-', ''), v));
  }

  return acc;
}, {}); // This is used by _mayCallChannel to determine how long to wait to before triggering a panel update

var PANEL_UPDATE_INTERVAL = 400;

function escapeStrings(obj) {
  if (typeof obj === 'string') {
    return (0, _escapeHtml.default)(obj);
  }

  if (obj == null || _typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var newArray = obj.map(escapeStrings);
    var didChange = newArray.some(function (newValue, key) {
      return newValue !== obj[key];
    });
    return didChange ? newArray : obj;
  }

  return Object.entries(obj).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        oldValue = _ref4[1];

    var newValue = escapeStrings(oldValue);
    return newValue === oldValue ? acc : Object.assign({}, acc, _defineProperty({}, key, newValue));
  }, obj);
}

var KnobManager = /*#__PURE__*/function () {
  function KnobManager() {
    _classCallCheck(this, KnobManager);

    this.knobStore = new _KnobStore.default();
    this.channel = void 0;
    this.options = {};
    this.calling = false;
  }

  _createClass(KnobManager, [{
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: "getKnobValue",
    value: function getKnobValue(_ref5) {
      var value = _ref5.value;
      return this.options.escapeHTML ? escapeStrings(value) : value;
    }
  }, {
    key: "knob",
    value: function knob(name, options) {
      this._mayCallChannel();

      var knobName = options.groupId ? "".concat(name, "_").concat(options.groupId) : name;
      var knobStore = this.knobStore;
      var existingKnob = knobStore.get(knobName); // We need to return the value set by the knob editor via this.
      // Normally the knobs are reset and so re-use is safe as long as the types match
      // when in storyshots, though the change event isn't called and so the knobs aren't reset, making this code fail
      // so always create a new knob when in storyshots

      if (existingKnob && options.type === existingKnob.type && _global.navigator && ( // userAgent is not set in react-native
      !_global.navigator.userAgent || !_global.navigator.userAgent.includes('jsdom'))) {
        var value = options.value,
            restOptions = _objectWithoutProperties(options, ["value"]);

        knobStore.update(knobName, restOptions);
        return this.getKnobValue(existingKnob);
      }

      var knobInfo = Object.assign({}, options, {
        name: knobName,
        label: name
      });

      if (knobValuesFromUrl[knobName]) {
        var _value = _converters.deserializers[options.type](knobValuesFromUrl[knobName]);

        knobInfo.defaultValue = _value;
        knobInfo.value = _value;
        delete knobValuesFromUrl[knobName];
      } else {
        knobInfo.defaultValue = options.value;
      }

      knobStore.set(knobName, knobInfo);
      return this.getKnobValue(knobStore.get(knobName));
    }
  }, {
    key: "_mayCallChannel",
    value: function _mayCallChannel() {
      var _this = this;

      // Re rendering of the story may cause changes to the knobStore. Some new knobs maybe added and
      // Some knobs may go unused. So we need to update the panel accordingly. For example remove the
      // unused knobs from the panel. This function sends the `setKnobs` message to the channel
      // triggering a panel re-render.
      if (!this.channel) {
        // to prevent call to undefined channel and therefore throwing TypeError
        return;
      }

      if (this.calling) {
        // If a call to channel has already registered ignore this call.
        // Once the previous call is completed all the changes to knobStore including the one that
        // triggered this, will be added to the panel.
        // This avoids emitting to the channel within very short periods of time.
        return;
      }

      this.calling = true;
      var timestamp = +new Date();
      setTimeout(function () {
        _this.calling = false; // emit to the channel and trigger a panel re-render

        if (_this.channel) _this.channel.emit(_shared.SET, {
          knobs: _this.knobStore.getAll(),
          timestamp: timestamp
        });
      }, PANEL_UPDATE_INTERVAL);
    }
  }]);

  return KnobManager;
}();

exports.default = KnobManager;
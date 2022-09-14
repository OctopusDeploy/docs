import "core-js/modules/es.array.for-each.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/web.dom-collections.for-each.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var callArg = function callArg(fn) {
  return fn();
};

var callAll = function callAll(fns) {
  return fns.forEach(callArg);
};

var KnobStore = /*#__PURE__*/function () {
  function KnobStore() {
    _classCallCheck(this, KnobStore);

    this.store = {};
    this.callbacks = [];
    this.timer = void 0;
  }

  _createClass(KnobStore, [{
    key: "has",
    value: function has(key) {
      return this.store[key] !== undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.store[key] = Object.assign({}, value, {
        used: true,
        groupId: value.groupId
      }); // debounce the execution of the callbacks for 50 milliseconds

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(callAll, 50, this.callbacks);
    }
  }, {
    key: "update",
    value: function update(key, options) {
      this.store[key] = Object.assign({}, this.store[key], options);
    }
  }, {
    key: "get",
    value: function get(key) {
      var knob = this.store[key];

      if (knob) {
        knob.used = true;
      }

      return knob;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.store;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.store = {};
    }
  }, {
    key: "markAllUnused",
    value: function markAllUnused() {
      var _this = this;

      Object.keys(this.store).forEach(function (knobName) {
        _this.store[knobName].used = false;
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb) {
      this.callbacks.push(cb);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(cb) {
      var index = this.callbacks.indexOf(cb);
      this.callbacks.splice(index, 1);
    }
  }]);

  return KnobStore;
}();

export { KnobStore as default };
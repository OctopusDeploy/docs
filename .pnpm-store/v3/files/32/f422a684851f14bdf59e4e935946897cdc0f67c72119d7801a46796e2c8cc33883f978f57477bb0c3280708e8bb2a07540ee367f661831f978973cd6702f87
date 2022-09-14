function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { PreviewList } from './PreviewList';

var _default = function _default(manager, context, sourceOptions) {
  var _this = this;

  _classCallCheck(this, _default);

  this.setup = function () {
    if (typeof window === 'undefined') {
      return;
    }

    if (_this.constructor.isSetUp) {
      throw new Error('Cannot have two MultiBackends at the same time.');
    }

    _this.constructor.isSetUp = true;

    _this.addEventListeners(window);

    _this.backends[_this.current].instance.setup();
  };

  this.teardown = function () {
    if (typeof window === 'undefined') {
      return;
    }

    _this.constructor.isSetUp = false;

    _this.removeEventListeners(window);

    _this.backends[_this.current].instance.teardown();
  };

  this.connectDragSource = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _this.connectBackend('connectDragSource', args);
  };

  this.connectDragPreview = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _this.connectBackend('connectDragPreview', args);
  };

  this.connectDropTarget = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _this.connectBackend('connectDropTarget', args);
  };

  this.previewEnabled = function () {
    return _this.backends[_this.current].preview;
  };

  this.addEventListeners = function (target) {
    _this.backends.forEach(function (backend) {
      if (backend.transition) {
        target.addEventListener(backend.transition.event, _this.backendSwitcher, true);
      }
    });
  };

  this.removeEventListeners = function (target) {
    _this.backends.forEach(function (backend) {
      if (backend.transition) {
        target.removeEventListener(backend.transition.event, _this.backendSwitcher, true);
      }
    });
  };

  this.backendSwitcher = function (event) {
    var oldBackend = _this.current;
    var i = 0;

    _this.backends.some(function (backend) {
      if (i !== _this.current && backend.transition && backend.transition.check(event)) {
        _this.current = i;
        return true;
      }

      i += 1;
      return false;
    });

    if (_this.current !== oldBackend) {
      _this.backends[oldBackend].instance.teardown();

      Object.keys(_this.nodes).forEach(function (id) {
        var node = _this.nodes[id];
        node.handler();
        node.handler = _this.callBackend(node.func, node.args);
      });

      _this.previews.backendChanged(_this);

      var newBackend = _this.backends[_this.current];
      newBackend.instance.setup();

      if (newBackend.skipDispatchOnTransition) {
        return;
      }

      var newEvent = null;

      try {
        newEvent = new event.constructor(event.type, event);
      } catch (_e) {
        newEvent = document.createEvent('Event');
        newEvent.initEvent(event.type, event.bubbles, event.cancelable);
      }

      event.target.dispatchEvent(newEvent);
    }
  };

  this.callBackend = function (func, args) {
    var _this$backends$_this$;

    return (_this$backends$_this$ = _this.backends[_this.current].instance)[func].apply(_this$backends$_this$, _toConsumableArray(args));
  };

  this.connectBackend = function (func, args) {
    var nodeId = "".concat(func, "_").concat(args[0]);

    var handler = _this.callBackend(func, args);

    _this.nodes[nodeId] = {
      func: func,
      args: args,
      handler: handler
    };
    return function () {
      var _this$nodes$nodeId;

      var r = (_this$nodes$nodeId = _this.nodes[nodeId]).handler.apply(_this$nodes$nodeId, arguments);

      delete _this.nodes[nodeId];
      return r;
    };
  };

  var options = Object.assign({
    backends: []
  }, sourceOptions || {});

  if (options.backends.length < 1) {
    throw new Error("You must specify at least one Backend, if you are coming from 2.x.x (or don't understand this error)\n        see this guide: https://github.com/louisbrunner/dnd-multi-backend/tree/master/packages/react-dnd-multi-backend#migrating-from-2xx");
  }

  this.current = 0;
  this.previews = new PreviewList();
  this.backends = [];
  options.backends.forEach(function (backend) {
    if (!backend.backend) {
      throw new Error("You must specify a 'backend' property in your Backend entry: ".concat(backend));
    }

    var transition = backend.transition;

    if (transition && !transition._isMBTransition) {
      throw new Error("You must specify a valid 'transition' property (either undefined or the return of 'createTransition') in your Backend entry: ".concat(backend));
    }

    _this.backends.push({
      instance: backend.backend(manager, context, backend.options),
      preview: backend.preview || false,
      transition: transition,
      skipDispatchOnTransition: Boolean(backend.skipDispatchOnTransition)
    });
  });
  this.nodes = {};
} // DnD Backend API
;

export { _default as default };
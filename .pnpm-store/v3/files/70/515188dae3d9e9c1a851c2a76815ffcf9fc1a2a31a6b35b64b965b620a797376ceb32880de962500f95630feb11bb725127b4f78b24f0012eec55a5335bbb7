"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/web.dom-collections.for-each.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_GROUP_ID = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _qs = _interopRequireDefault(require("qs"));

var _global = require("global");

var _theming = require("@storybook/theming");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _shared = require("../shared");

var _types = require("./types");

var _PropForm = _interopRequireDefault(require("./PropForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var getTimestamp = function getTimestamp() {
  return +new Date();
};

var DEFAULT_GROUP_ID = 'Other';
exports.DEFAULT_GROUP_ID = DEFAULT_GROUP_ID;
var PanelWrapper = (0, _theming.styled)(function (_ref) {
  var children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement(_components.ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  height: '100%',
  width: '100%'
});

var KnobPanel = /*#__PURE__*/function (_PureComponent) {
  _inherits(KnobPanel, _PureComponent);

  var _super = _createSuper(KnobPanel);

  function KnobPanel() {
    var _this;

    _classCallCheck(this, KnobPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      knobs: {}
    };
    _this.options = {};
    _this.lastEdit = getTimestamp();
    _this.loadedFromUrl = false;
    _this.mounted = false;

    _this.setOptions = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        timestamps: false
      };
      _this.options = options;
    };

    _this.setKnobs = function (_ref2) {
      var knobs = _ref2.knobs,
          timestamp = _ref2.timestamp;
      var queryParams = {};
      var api = _this.props.api;

      if (!_this.options.timestamps || !timestamp || _this.lastEdit <= timestamp) {
        Object.keys(knobs).forEach(function (name) {
          var knob = knobs[name]; // For the first time, get values from the URL and set them.

          if (!_this.loadedFromUrl) {
            var urlValue = api.getQueryParam("knob-".concat(name)); // If the knob value present in url

            if (urlValue !== undefined) {
              var value = (0, _types.getKnobControl)(knob.type).deserialize(urlValue);
              knob.value = value;
              queryParams["knob-".concat(name)] = (0, _types.getKnobControl)(knob.type).serialize(value);
              api.emit(_shared.CHANGE, knob);
            }
          }
        });
        api.setQueryParams(queryParams);

        _this.setState({
          knobs: knobs
        });

        _this.loadedFromUrl = true;
      }
    };

    _this.reset = function () {
      var api = _this.props.api;
      api.emit(_shared.RESET);
    };

    _this.copy = function () {
      var location = _global.document.location;

      var query = _qs.default.parse(location.search, {
        ignoreQueryPrefix: true
      });

      var knobs = _this.state.knobs;
      Object.entries(knobs).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            knob = _ref4[1];

        query["knob-".concat(name)] = (0, _types.getKnobControl)(knob.type).serialize(knob.value);
      });
      (0, _copyToClipboard.default)("".concat(location.origin + location.pathname, "?").concat(_qs.default.stringify(query, {
        encode: false
      }))); // TODO: show some notification of this
    };

    _this.emitChange = function (changedKnob) {
      var api = _this.props.api;
      api.emit(_shared.CHANGE, changedKnob);
    };

    _this.handleChange = function (changedKnob) {
      _this.lastEdit = getTimestamp();
      var api = _this.props.api;
      var knobs = _this.state.knobs;
      var name = changedKnob.name;
      var newKnobs = Object.assign({}, knobs);
      newKnobs[name] = Object.assign({}, newKnobs[name], changedKnob);

      _this.setState({
        knobs: newKnobs
      }, function () {
        _this.emitChange(changedKnob);

        var queryParams = {};
        Object.keys(newKnobs).forEach(function (n) {
          var knob = newKnobs[n];
          queryParams["knob-".concat(n)] = (0, _types.getKnobControl)(knob.type).serialize(knob.value);
        });
        api.setQueryParams(queryParams);
      });
    };

    _this.handleClick = function (knob) {
      var api = _this.props.api;
      api.emit(_shared.CLICK, knob);
    };

    _this.stopListeningOnStory = void 0;
    return _this;
  }

  _createClass(KnobPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var api = this.props.api;
      api.on(_shared.SET, this.setKnobs);
      api.on(_shared.SET_OPTIONS, this.setOptions);
      this.stopListeningOnStory = api.on(_coreEvents.STORY_CHANGED, function () {
        if (_this2.mounted) {
          _this2.setKnobs({
            knobs: {}
          });
        }

        _this2.setKnobs({
          knobs: {}
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      var api = this.props.api;
      api.off(_shared.SET, this.setKnobs);
      this.stopListeningOnStory();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var knobs = this.state.knobs;
      var panelActive = this.props.active;

      if (!panelActive) {
        return null;
      }

      var groups = {};
      var groupIds = [];
      var knobKeysArray = Object.keys(knobs).filter(function (key) {
        return knobs[key].used;
      });
      knobKeysArray.forEach(function (key) {
        var knobKeyGroupId = knobs[key].groupId || DEFAULT_GROUP_ID;
        groupIds.push(knobKeyGroupId);
        groups[knobKeyGroupId] = {
          render: function render(_ref5) {
            var active = _ref5.active;
            return /*#__PURE__*/_react.default.createElement(_components.TabWrapper, {
              key: knobKeyGroupId,
              active: active
            }, /*#__PURE__*/_react.default.createElement(_PropForm.default, {
              knobs: knobsArray.filter(function (knob) {
                return (knob.groupId || DEFAULT_GROUP_ID) === knobKeyGroupId;
              }),
              onFieldChange: _this3.handleChange,
              onFieldClick: _this3.handleClick
            }));
          },
          title: knobKeyGroupId
        };
      });
      var knobsArray = knobKeysArray.map(function (key) {
        return knobs[key];
      });

      if (knobsArray.length === 0) {
        return /*#__PURE__*/_react.default.createElement(_components.Placeholder, null, /*#__PURE__*/_react.default.createElement(_react.Fragment, null, "No knobs found"), /*#__PURE__*/_react.default.createElement(_react.Fragment, null, "Learn how to\xA0", /*#__PURE__*/_react.default.createElement(_components.Link, {
          href: "https://github.com/storybookjs/storybook/tree/master/addons/knobs",
          target: "_blank",
          withArrow: true,
          cancel: false
        }, "dynamically interact with components")));
      } // Always sort DEFAULT_GROUP_ID (ungrouped) tab last without changing the remaining tabs


      var sortEntries = function sortEntries(g) {
        var unsortedKeys = Object.keys(g);

        if (unsortedKeys.includes(DEFAULT_GROUP_ID)) {
          var sortedKeys = unsortedKeys.filter(function (key) {
            return key !== DEFAULT_GROUP_ID;
          });
          sortedKeys.push(DEFAULT_GROUP_ID);
          return sortedKeys.map(function (key) {
            return [key, g[key]];
          });
        }

        return Object.entries(g);
      };

      var entries = sortEntries(groups);
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(PanelWrapper, null, entries.length > 1 ? /*#__PURE__*/_react.default.createElement(_components.TabsState, null, entries.map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            k = _ref7[0],
            v = _ref7[1];

        return /*#__PURE__*/_react.default.createElement("div", {
          id: k,
          key: k,
          title: v.title
        }, v.render);
      })) : /*#__PURE__*/_react.default.createElement(_PropForm.default, {
        knobs: knobsArray,
        onFieldChange: this.handleChange,
        onFieldClick: this.handleClick
      })), /*#__PURE__*/_react.default.createElement(_components.ActionBar, {
        actionItems: [{
          title: 'Copy',
          onClick: this.copy
        }, {
          title: 'Reset',
          onClick: this.reset
        }]
      }));
    }
  }]);

  return KnobPanel;
}(_react.PureComponent);

exports.default = KnobPanel;
KnobPanel.propTypes = {
  active: _propTypes.default.bool.isRequired,
  onReset: _propTypes.default.object,
  // eslint-disable-line
  api: _propTypes.default.shape({
    on: _propTypes.default.func,
    off: _propTypes.default.func,
    emit: _propTypes.default.func,
    getQueryParam: _propTypes.default.func,
    setQueryParams: _propTypes.default.func
  }).isRequired
};
KnobPanel.defaultProps = {
  active: true,
  api: {
    on: function on() {
      return function () {};
    },
    off: function off() {},
    emit: function emit() {},
    getQueryParam: function getQueryParam() {
      return undefined;
    },
    setQueryParams: function setQueryParams() {}
  }
};
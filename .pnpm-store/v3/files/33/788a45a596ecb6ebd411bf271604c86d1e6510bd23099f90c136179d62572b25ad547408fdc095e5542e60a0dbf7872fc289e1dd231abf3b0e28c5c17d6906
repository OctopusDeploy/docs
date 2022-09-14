"use strict";

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _router = require("@reach/router");

var _coreEvents = require("@storybook/core-events");

var _router2 = require("@storybook/router");

var _csf = require("@storybook/csf");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _global = require("global");

var _stories = require("../lib/stories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Initialize the state based on the URL.
// NOTE:
//   Although we don't change the URL when you change the state, we do support setting initial state
//   via the following URL parameters:
//     - full: 0/1 -- show fullscreen
//     - panel: bottom/right/0 -- set addons panel position (or hide)
//     - nav: 0/1 -- show or hide the story list
//
//   We also support legacy URLs from storybook <5
var prevParams;

var initialUrlSupport = function initialUrlSupport(_ref) {
  var _ref$state = _ref.state,
      location = _ref$state.location,
      path = _ref$state.path,
      viewMode = _ref$state.viewMode,
      storyIdFromUrl = _ref$state.storyId;
  var addition = {};
  var query = (0, _router2.queryFromLocation)(location);
  var selectedPanel;

  var full = query.full,
      panel = query.panel,
      nav = query.nav,
      addons = query.addons,
      panelRight = query.panelRight,
      stories = query.stories,
      addonPanel = query.addonPanel,
      selectedKind = query.selectedKind,
      selectedStory = query.selectedStory,
      queryPath = query.path,
      otherParams = _objectWithoutProperties(query, ["full", "panel", "nav", "addons", "panelRight", "stories", "addonPanel", "selectedKind", "selectedStory", "path"]);

  if (full === '1') {
    addition.isFullscreen = true;
  }

  if (panel) {
    if (['right', 'bottom'].includes(panel)) {
      addition.panelPosition = panel;
    } else if (panel === '0') {
      addition.showPanel = false;
    }
  }

  if (nav === '0') {
    addition.showNav = false;
  } // Legacy URLs


  if (addons === '0') {
    addition.showPanel = false;
  }

  if (panelRight === '1') {
    addition.panelPosition = 'right';
  }

  if (stories === '0') {
    addition.showNav = false;
  }

  if (addonPanel) {
    selectedPanel = addonPanel;
  } // If the user hasn't set the storyId on the URL, we support legacy URLs (selectedKind/selectedStory)
  // NOTE: this "storyId" can just be a prefix of a storyId, really it is a storyIdSpecifier.


  var storyId = storyIdFromUrl;

  if (!storyId) {
    if (selectedKind && selectedStory) {
      storyId = (0, _csf.toId)(selectedKind, selectedStory);
    } else if (selectedKind) {
      storyId = (0, _csf.sanitize)(selectedKind);
    }
  } // Avoid returning a new object each time if no params actually changed.


  var customQueryParams = (0, _fastDeepEqual.default)(prevParams, otherParams) ? prevParams : otherParams;
  prevParams = customQueryParams;
  return {
    viewMode: viewMode,
    layout: addition,
    selectedPanel: selectedPanel,
    location: location,
    path: path,
    customQueryParams: customQueryParams,
    storyId: storyId
  };
};

var init = function init(_ref2) {
  var store = _ref2.store,
      navigate = _ref2.navigate,
      state = _ref2.state,
      provider = _ref2.provider,
      fullAPI = _ref2.fullAPI,
      rest = _objectWithoutProperties(_ref2, ["store", "navigate", "state", "provider", "fullAPI"]);

  var api = {
    getQueryParam: function getQueryParam(key) {
      var _store$getState = store.getState(),
          customQueryParams = _store$getState.customQueryParams;

      return customQueryParams ? customQueryParams[key] : undefined;
    },
    getUrlState: function getUrlState() {
      var _store$getState2 = store.getState(),
          path = _store$getState2.path,
          customQueryParams = _store$getState2.customQueryParams,
          storyId = _store$getState2.storyId,
          url = _store$getState2.url,
          viewMode = _store$getState2.viewMode;

      return {
        path: path,
        queryParams: customQueryParams,
        storyId: storyId,
        url: url,
        viewMode: viewMode
      };
    },
    setQueryParams: function setQueryParams(input) {
      var _store$getState3 = store.getState(),
          customQueryParams = _store$getState3.customQueryParams;

      var queryParams = {};
      var update = Object.assign({}, customQueryParams, Object.entries(input).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (value !== null) {
          acc[key] = value;
        }

        return acc;
      }, queryParams));
      var equal = (0, _fastDeepEqual.default)(customQueryParams, update);
      if (!equal) store.setState({
        customQueryParams: update
      });
    },
    navigateUrl: function navigateUrl(url, options) {
      (0, _router.navigate)(url, options);
    }
  };

  var initModule = function initModule() {
    // Sets `args` parameter in URL, omitting any args that have their initial value or cannot be unserialized safely.
    var updateArgsParam = function updateArgsParam() {
      var _fullAPI$getUrlState = fullAPI.getUrlState(),
          path = _fullAPI$getUrlState.path,
          viewMode = _fullAPI$getUrlState.viewMode;

      if (viewMode !== 'story') return;
      var currentStory = fullAPI.getCurrentStoryData();
      if (!(0, _stories.isStory)(currentStory)) return;
      var args = currentStory.args,
          initialArgs = currentStory.initialArgs;
      var argsString = (0, _router2.buildArgsParam)(initialArgs, args);
      var argsParam = argsString.length ? "&args=".concat(argsString) : '';
      (0, _router2.navigate)("".concat(path).concat(argsParam), {
        replace: true
      });
      api.setQueryParams({
        args: argsString
      });
    };

    fullAPI.on(_coreEvents.SET_CURRENT_STORY, function () {
      return updateArgsParam();
    });
    var handleOrId;
    fullAPI.on(_coreEvents.STORY_ARGS_UPDATED, function () {
      if ('requestIdleCallback' in _global.window) {
        if (handleOrId) _global.window.cancelIdleCallback(handleOrId);
        handleOrId = _global.window.requestIdleCallback(updateArgsParam, {
          timeout: 1000
        });
      } else {
        if (handleOrId) clearTimeout(handleOrId);
        setTimeout(updateArgsParam, 100);
      }
    });
    fullAPI.on(_coreEvents.NAVIGATE_URL, function (url, options) {
      fullAPI.navigateUrl(url, options);
    });

    if (fullAPI.showReleaseNotesOnLaunch()) {
      navigate('/settings/release-notes');
    }
  };

  return {
    api: api,
    state: initialUrlSupport(Object.assign({
      store: store,
      navigate: navigate,
      state: state,
      provider: provider,
      fullAPI: fullAPI
    }, rest)),
    init: initModule
  };
};

exports.init = init;
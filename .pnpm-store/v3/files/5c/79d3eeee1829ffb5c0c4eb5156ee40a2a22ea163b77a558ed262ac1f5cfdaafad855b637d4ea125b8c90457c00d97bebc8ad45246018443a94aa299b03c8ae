"use strict";

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = keys;
exports.init = exports.defaultShortcuts = exports.controlOrMetaKey = exports.isMacLike = void 0;

require("regenerator-runtime/runtime.js");

var _global = require("global");

var _coreEvents = require("@storybook/core-events");

var _shortcut = require("../lib/shortcut");

var _layout = require("./layout");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isMacLike = function isMacLike() {
  return _global.navigator && _global.navigator.platform ? !!_global.navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) : false;
};

exports.isMacLike = isMacLike;

var controlOrMetaKey = function controlOrMetaKey() {
  return isMacLike() ? 'meta' : 'control';
};

exports.controlOrMetaKey = controlOrMetaKey;

function keys(o) {
  return Object.keys(o);
}

var defaultShortcuts = Object.freeze({
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: [controlOrMetaKey(), 'shift', ','],
  aboutPage: [','],
  escape: ['escape'],
  // This one is not customizable
  collapseAll: [controlOrMetaKey(), 'shift', 'ArrowUp'],
  expandAll: [controlOrMetaKey(), 'shift', 'ArrowDown']
});
exports.defaultShortcuts = defaultShortcuts;

function focusInInput(event) {
  return /input|textarea/i.test(event.target.tagName) || event.target.getAttribute('contenteditable') !== null;
}

var init = function init(_ref) {
  var store = _ref.store,
      fullAPI = _ref.fullAPI;
  var api = {
    // Getting and setting shortcuts
    getShortcutKeys: function getShortcutKeys() {
      return store.getState().shortcuts;
    },
    setShortcuts: function setShortcuts(shortcuts) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return store.setState({
                  shortcuts: shortcuts
                }, {
                  persistence: 'permanent'
                });

              case 2:
                return _context.abrupt("return", shortcuts);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    restoreAllDefaultShortcuts: function restoreAllDefaultShortcuts() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", api.setShortcuts(defaultShortcuts));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    setShortcut: function setShortcut(action, value) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var shortcuts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shortcuts = api.getShortcutKeys();
                _context3.next = 3;
                return api.setShortcuts(Object.assign({}, shortcuts, _defineProperty({}, action, value)));

              case 3:
                return _context3.abrupt("return", value);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    restoreDefaultShortcut: function restoreDefaultShortcut(action) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var defaultShortcut;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                defaultShortcut = defaultShortcuts[action];
                return _context4.abrupt("return", api.setShortcut(action, defaultShortcut));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // Listening to shortcut events
    handleKeydownEvent: function handleKeydownEvent(event) {
      var shortcut = (0, _shortcut.eventToShortcut)(event);
      var shortcuts = api.getShortcutKeys();
      var actions = keys(shortcuts);
      var matchedFeature = actions.find(function (feature) {
        return (0, _shortcut.shortcutMatchesShortcut)(shortcut, shortcuts[feature]);
      });

      if (matchedFeature) {
        // Event.prototype.preventDefault is missing when received from the MessageChannel.
        if (event !== null && event !== void 0 && event.preventDefault) event.preventDefault();
        api.handleShortcutFeature(matchedFeature);
      }
    },
    // warning: event might not have a full prototype chain because it may originate from the channel
    handleShortcutFeature: function handleShortcutFeature(feature) {
      var _store$getState = store.getState(),
          _store$getState$layou = _store$getState.layout,
          isFullscreen = _store$getState$layou.isFullscreen,
          showNav = _store$getState$layou.showNav,
          showPanel = _store$getState$layou.showPanel,
          enableShortcuts = _store$getState.ui.enableShortcuts;

      if (!enableShortcuts) {
        return;
      }

      switch (feature) {
        case 'escape':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
            } else if (!showNav) {
              fullAPI.toggleNav();
            }

            break;
          }

        case 'focusNav':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
            }

            if (!showNav) {
              fullAPI.toggleNav();
            }

            fullAPI.focusOnUIElement(_layout.focusableUIElements.storyListMenu);
            break;
          }

        case 'search':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
            }

            if (!showNav) {
              fullAPI.toggleNav();
            }

            setTimeout(function () {
              fullAPI.focusOnUIElement(_layout.focusableUIElements.storySearchField, true);
            }, 0);
            break;
          }

        case 'focusIframe':
          {
            var element = _global.document.getElementById('storybook-preview-iframe');

            if (element) {
              try {
                // should be like a channel message and all that, but yolo for now
                element.contentWindow.focus();
              } catch (e) {//
              }
            }

            break;
          }

        case 'focusPanel':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
            }

            if (!showPanel) {
              fullAPI.togglePanel();
            }

            fullAPI.focusOnUIElement(_layout.focusableUIElements.storyPanelRoot);
            break;
          }

        case 'nextStory':
          {
            fullAPI.jumpToStory(1);
            break;
          }

        case 'prevStory':
          {
            fullAPI.jumpToStory(-1);
            break;
          }

        case 'nextComponent':
          {
            fullAPI.jumpToComponent(1);
            break;
          }

        case 'prevComponent':
          {
            fullAPI.jumpToComponent(-1);
            break;
          }

        case 'fullScreen':
          {
            fullAPI.toggleFullscreen();
            break;
          }

        case 'togglePanel':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
              fullAPI.resetLayout();
            }

            fullAPI.togglePanel();
            break;
          }

        case 'toggleNav':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
              fullAPI.resetLayout();
            }

            fullAPI.toggleNav();
            break;
          }

        case 'toolbar':
          {
            fullAPI.toggleToolbar();
            break;
          }

        case 'panelPosition':
          {
            if (isFullscreen) {
              fullAPI.toggleFullscreen();
            }

            if (!showPanel) {
              fullAPI.togglePanel();
            }

            fullAPI.togglePanelPosition();
            break;
          }

        case 'aboutPage':
          {
            fullAPI.navigate('/settings/about');
            break;
          }

        case 'shortcutsPage':
          {
            fullAPI.navigate('/settings/shortcuts');
            break;
          }

        case 'collapseAll':
          {
            fullAPI.collapseAll();
            break;
          }

        case 'expandAll':
          {
            fullAPI.expandAll();
            break;
          }

        default:
          break;
      }
    }
  };

  var _store$getState2 = store.getState(),
      _store$getState2$shor = _store$getState2.shortcuts,
      persistedShortcuts = _store$getState2$shor === void 0 ? defaultShortcuts : _store$getState2$shor;

  var state = {
    // Any saved shortcuts that are still in our set of defaults
    shortcuts: keys(defaultShortcuts).reduce(function (acc, key) {
      return Object.assign({}, acc, _defineProperty({}, key, persistedShortcuts[key] || defaultShortcuts[key]));
    }, defaultShortcuts)
  };

  var initModule = function initModule() {
    // Listen for keydown events in the manager
    _global.document.addEventListener('keydown', function (event) {
      if (!focusInInput(event)) {
        fullAPI.handleKeydownEvent(event);
      }
    }); // Also listen to keydown events sent over the channel


    fullAPI.on(_coreEvents.PREVIEW_KEYDOWN, function (data) {
      fullAPI.handleKeydownEvent(data.event);
    });
  };

  return {
    api: api,
    state: state,
    init: initModule
  };
};

exports.init = init;
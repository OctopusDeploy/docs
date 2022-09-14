"use strict";

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultDecorateStory = exports.decorateStory = void 0;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {}
};
/**
 * When you call the story function inside a decorator, e.g.:
 *
 * ```jsx
 * <div>{storyFn({ foo: 'bar' })}</div>
 * ```
 *
 * This will override the `foo` property on the `innerContext`, which gets
 * merged in with the default context
 */

var decorateStory = function decorateStory(storyFn, decorator) {
  return function () {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContext;
    return decorator( // You cannot override the parameters key, it is fixed
    function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var parameters = _ref.parameters,
          innerContext = _objectWithoutProperties(_ref, ["parameters"]);

      return storyFn(Object.assign({}, context, innerContext));
    }, context);
  };
};

exports.decorateStory = decorateStory;

var defaultDecorateStory = function defaultDecorateStory(storyFn, decorators) {
  return decorators.reduce(decorateStory, storyFn);
};

exports.defaultDecorateStory = defaultDecorateStory;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.create = exports._interface = void 0;

var _Env = _interopRequireDefault(require('./Env'));

var _JsApiReporter = _interopRequireDefault(require('./JsApiReporter'));

var _ReportDispatcher = _interopRequireDefault(require('./ReportDispatcher'));

var _Spec = _interopRequireDefault(require('./Spec'));

var _Suite = _interopRequireDefault(require('./Suite'));

var _Timer = _interopRequireDefault(require('./Timer'));

var _createSpy = _interopRequireDefault(require('./createSpy'));

var _spyRegistry = _interopRequireDefault(require('./spyRegistry'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = globalThis['jest-symbol-do-not-touch'] || globalThis.Symbol;
const testTimeoutSymbol = Symbol.for('TEST_TIMEOUT_SYMBOL');

const create = function (createOptions) {
  const j$ = {...createOptions};
  Object.defineProperty(j$, '_DEFAULT_TIMEOUT_INTERVAL', {
    configurable: true,
    enumerable: true,

    get() {
      // eslint-disable-next-line no-restricted-globals
      return global[testTimeoutSymbol] || createOptions.testTimeout || 5000;
    },

    set(value) {
      // eslint-disable-next-line no-restricted-globals
      global[testTimeoutSymbol] = value;
    }
  });

  j$.getEnv = function () {
    const env = (j$.currentEnv_ = j$.currentEnv_ || new j$.Env()); //jasmine. singletons in here (setTimeout blah blah).

    return env;
  };

  j$.createSpy = _createSpy.default;
  j$.Env = (0, _Env.default)(j$);
  j$.JsApiReporter = _JsApiReporter.default;
  j$.ReportDispatcher = _ReportDispatcher.default;
  j$.Spec = _Spec.default;
  j$.SpyRegistry = _spyRegistry.default;
  j$.Suite = _Suite.default;
  j$.Timer = _Timer.default;
  j$.version = '2.5.2-light';
  return j$;
}; // Interface is a reserved word in strict mode, so can't export it as ESM

exports.create = create;

const _interface = function (jasmine, env) {
  const jasmineInterface = {
    describe(description, specDefinitions) {
      return env.describe(description, specDefinitions);
    },

    xdescribe(description, specDefinitions) {
      return env.xdescribe(description, specDefinitions);
    },

    fdescribe(description, specDefinitions) {
      return env.fdescribe(description, specDefinitions);
    },

    it() {
      return env.it.apply(env, arguments);
    },

    xit() {
      return env.xit.apply(env, arguments);
    },

    fit() {
      return env.fit.apply(env, arguments);
    },

    beforeEach() {
      if (typeof arguments[0] !== 'function') {
        throw new Error(
          'Invalid first argument. It must be a callback function.'
        );
      }

      return env.beforeEach.apply(env, arguments);
    },

    afterEach() {
      if (typeof arguments[0] !== 'function') {
        throw new Error(
          'Invalid first argument. It must be a callback function.'
        );
      }

      return env.afterEach.apply(env, arguments);
    },

    beforeAll() {
      if (typeof arguments[0] !== 'function') {
        throw new Error(
          'Invalid first argument. It must be a callback function.'
        );
      }

      return env.beforeAll.apply(env, arguments);
    },

    afterAll() {
      if (typeof arguments[0] !== 'function') {
        throw new Error(
          'Invalid first argument. It must be a callback function.'
        );
      }

      return env.afterAll.apply(env, arguments);
    },

    pending() {
      return env.pending.apply(env, arguments);
    },

    fail() {
      return env.fail.apply(env, arguments);
    },

    spyOn(obj, methodName, accessType) {
      return env.spyOn(obj, methodName, accessType);
    },

    jsApiReporter: new jasmine.JsApiReporter({
      timer: new jasmine.Timer()
    }),
    jasmine
  };
  return jasmineInterface;
};

exports._interface = _interface;

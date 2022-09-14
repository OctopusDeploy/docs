"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParam = exports.getQueryParams = void 0;

var _global = require("global");

var _qs = require("qs");

var getQueryParams = function getQueryParams() {
  // document.location is not defined in react-native
  if (_global.document && _global.document.location && _global.document.location.search) {
    return (0, _qs.parse)(_global.document.location.search, {
      ignoreQueryPrefix: true
    });
  }

  return {};
};

exports.getQueryParams = getQueryParams;

var getQueryParam = function getQueryParam(key) {
  var params = getQueryParams();
  return params[key];
};

exports.getQueryParam = getQueryParam;
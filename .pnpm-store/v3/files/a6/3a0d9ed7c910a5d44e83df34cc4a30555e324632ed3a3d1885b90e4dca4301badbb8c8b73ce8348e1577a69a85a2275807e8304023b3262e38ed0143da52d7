"use strict";

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTitleListener = createTitleListener;

var _shared = require("./shared");

function createTitleListener(api) {
  var knobsCount = 0;
  api.on(_shared.SET, function (_ref) {
    var knobs = _ref.knobs;
    knobsCount = Object.keys(knobs).length;
  });
  return function () {
    return knobsCount === 0 ? 'Knobs' : "Knobs (".concat(knobsCount, ")");
  };
}
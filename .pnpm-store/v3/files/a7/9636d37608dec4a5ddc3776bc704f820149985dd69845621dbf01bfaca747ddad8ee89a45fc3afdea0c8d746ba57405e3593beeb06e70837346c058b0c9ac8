"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputStats = outputStats;
exports.writeStats = void 0;

require("core-js/modules/es.promise.js");

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function outputStats(directory, previewStats, managerStats) {
  if (previewStats) {
    var filePath = await writeStats(directory, 'preview', previewStats);

    _nodeLogger.logger.info(`=> preview stats written to ${_chalk.default.cyan(filePath)}`);
  }

  if (managerStats) {
    var _filePath = await writeStats(directory, 'manager', managerStats);

    _nodeLogger.logger.info(`=> manager stats written to ${_chalk.default.cyan(_filePath)}`);
  }
}

var writeStats = async function (directory, name, stats) {
  var filePath = _path.default.join(directory, `${name}-stats.json`);

  await _fsExtra.default.outputFile(filePath, JSON.stringify(stats.toJson(), null, 2), 'utf8');
  return filePath;
};

exports.writeStats = writeStats;
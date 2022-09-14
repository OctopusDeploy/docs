import "core-js/modules/es.promise.js";
import chalk from 'chalk';
import path from 'path';
import { logger } from '@storybook/node-logger';
import fs from 'fs-extra';
export async function outputStats(directory, previewStats, managerStats) {
  if (previewStats) {
    var filePath = await writeStats(directory, 'preview', previewStats);
    logger.info(`=> preview stats written to ${chalk.cyan(filePath)}`);
  }

  if (managerStats) {
    var _filePath = await writeStats(directory, 'manager', managerStats);

    logger.info(`=> manager stats written to ${chalk.cyan(_filePath)}`);
  }
}
export var writeStats = async function (directory, name, stats) {
  var filePath = path.join(directory, `${name}-stats.json`);
  await fs.outputFile(filePath, JSON.stringify(stats.toJson(), null, 2), 'utf8');
  return filePath;
};
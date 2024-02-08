/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

import fs from 'fs';
import { parse } from 'csv-parse';

const processFile = async (verbose) => {
    const operations = {};
    const parser = fs
        .createReadStream(`.log/statistics.csv`)
        .pipe(parse({ delimiter: ',', fromLine: 2 }));
    
    for await (const record of parser) {
        // Work with each record
        const operation = record[0];
        const date = record[1];
        const ms = parseInt(record[2], 10);

        if (operations[operation] == null) {
            operations[operation] = { name: operation, ms: 0, calls: 0 };

            if (verbose) {
                operations[operation].times = [];
            }
        }

        operations[operation].ms = operations[operation].ms + ms;
        operations[operation].calls++;
        operations[operation].avg = operations[operation].ms / operations[operation].calls;

        if (verbose) {
            operations[operation].times.push(date);
        }
    }

    return Object.values(operations);
};

const records = (await processFile(false))
    .filter(record => record.ms > 2000 || record.avg > 20)
    .sort((a,b) => {
        return b.ms - a.ms;
    });

for (let record of records) {
    console.warn('Performance:', `For "${record.name}", ${record.calls} calls took ${record.ms/1000} seconds (an average of ${Math.round(record.avg * 10000) / 10000} ms)`);
}
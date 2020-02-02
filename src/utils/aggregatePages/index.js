const { readFilesInDirectory } = require('./../readDirectory');
const createExtractor = require('./createExtractor');
const chalk = require('chalk');

function aggregatePages(config) {
  try {
    if (typeof config === 'string') {
      config.folder = config;
    }
  
    if (config.fields === undefined) {
      config.fields = '*';
    }
  
    const { folder, fields } = config;
    const records = readFilesInDirectory(folder).map(createExtractor(fields));
    return records;
  }
  catch (e) {
    console.error(chalk.red('[Aggregate pages] Error:'));
    console.error(e);
  }

}

module.exports = aggregatePages;

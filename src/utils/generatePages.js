const { readDirectory } = require('./readDirectory');
const path = require('path');
const chalk = require('chalk');
const trimmer = require('./trimmer');
const FileInterface = require('./readDirectory/file-interface');

/**
 * Generate direct pages links for currently available content
 */
function dynamicToStaticPages({ url, data }) {
  const [staticPathOfPart, variableName] = data.split(':');
  return readDirectory(staticPathOfPart).map(pathToFile => {
    const fileName = path.basename(pathToFile);
    const file = new FileInterface(data.replace(`:${variableName}`, fileName));
    const pathWithoutExtension = trimmer(pathToFile).sliceBeforeLast('.');
    return {
      url: '/' + pathWithoutExtension,
      data: file.read()
    };
  });
}

function generatePages(pages) {
  try {
    return pages.reduce((acc, page) => {
      if (page.url.includes(':')) {
        acc = acc.concat(dynamicToStaticPages(page));
      }
      else {
        acc.push(page);
      }
      return acc;
    }, []);
  }
  catch (error) {
    console.error(chalk.red('[Generate pages] Error:'));
    console.error(error);
  }
}

module.exports = generatePages;
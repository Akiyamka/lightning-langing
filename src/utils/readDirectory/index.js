const fs = require('fs');
const { join } = require('path');
const FileInterface = require('./file-interface');

const isDirectory = path => fs.lstatSync(path).isDirectory();
const ls = path => fs.readdirSync(path).map(name => join(path, name));

function readDirectoryRecursive(path, maxDeep = 10) {
  return ls(path).reduce((files, childPath) => {
    if (isDirectory(childPath) && maxDeep > 0) {
      files = files.concat(
        readDirectoryRecursive(childPath, maxDeep - 1)
      );
    }
    else {
      files.push(childPath);
    }
    return files;
  }, []);
}

module.exports.readDirectory = readDirectoryRecursive;

function readFilesInDirectory(path) {
  const filesPaths = readDirectoryRecursive(path);
  const files = filesPaths.map(path => new FileInterface(path));
  return files;
}

module.exports.readFilesInDirectory = readFilesInDirectory;

const { sep } = require('path');
const { readFileSync } = require('fs');
const parseMD = require('parse-md').default;

class FileInterface {
  constructor(path) {
    this.path = path;
  }

  static getExtention(fileName) {
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  }

  static getFilename(path) {
    return path.substr(path.lastIndexOf(sep) + 1);
  }

  static getParser(extention) {
    switch (extention) {
      case 'md':
      case 'markdown': {
        return parseMD;
      }

      case 'json': {
        return JSON.parse;
      }

      default: {
        console.error('File format not recognised:', extention);
      }
    }
  }

  get fileName() {
    return this.constructor.getFilename(this.path);
  }

  get extention() {
    return this.constructor.getExtention(this.fileName);
  }

  get id() {
    return this.fileName;
  }

  read() {
    const string = readFileSync(this.path, 'utf-8');
    const parser = this.constructor.getParser(this.extention);
    this.data = parser(string);
    return this.data;
  }
}

module.exports = FileInterface;

const { sep } = require('path');
const { readFileSync } = require('fs');
const parseMD = require('parse-md').default;

class FileInterface {
  constructor(path) {
    this.path = path;
  }

  static getExtension(fileName) {
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  }

  static getFilename(path) {
    return path.substr(path.lastIndexOf(sep) + 1);
  }

  static getParser(extension) {
    switch (extension) {
      case 'md':
      case 'markdown': {
        return parseMD;
      }

      case 'json': {
        return JSON.parse;
      }

      default: {
        console.error('File format not recognized:', extension);
      }
    }
  }

  get fileName() {
    return this.constructor.getFilename(this.path);
  }

  get extension() {
    return this.constructor.getExtension(this.fileName);
  }

  get id() {
    return this.fileName.substr(0, this.fileName.lastIndexOf('.'));
  }

  read() {
    const string = readFileSync(this.path, 'utf-8');
    const parser = this.constructor.getParser(this.extension);
    this.data = parser(string);
    this.data.id = this.id;
    return this.data;
  }
}

module.exports = FileInterface;

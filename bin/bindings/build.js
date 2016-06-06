'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;
exports.createElement = createElement;
exports.file = file;
exports.style = style;
exports.__finish = __finish;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = function hash(str) {
  return _crypto2.default.createHash('md5').update(str).digest("hex");
};

var files = [];
var css = '';

var Component = exports.Component = function Component() {
  _classCallCheck(this, Component);
};

function createElement() {}

function file(filename) {
  files.push(filename);
  return 'local://' + filename;
}

function style(style) {
  css += '.className {\n  background: red;\n}\n\n.className h1 {\n  color: blue;\n}\n\n.className h2 {\n  color: green;\n}\n';
  return function (sel) {
    return sel == '' ? 'className' : '';
  };
}

function __finish() {
  var dir = __dirname;

  var outFiles = [];
  files.forEach(function (file, ind) {
    var outfile = _path2.default.join(dir, 'file' + ind + _path2.default.extname(file));
    _fs2.default.writeFileSync(outfile, _fs2.default.readFileSync(file));
    outFiles.push([file, outfile]);
  });

  _fs2.default.writeFileSync(_path2.default.join(dir, 'styles.css'), css);

  _fs2.default.writeFileSync(_path2.default.join(dir, '__manifest.js'), 'module.exports = ' + JSON.stringify({
    files: outFiles,
    stylesheets: ['styles.css']
  }) + ';');
}
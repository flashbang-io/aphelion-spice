import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { styleObjectToCSS, parseStyleObject } from '../cssFunctions';

const hash = str => crypto.createHash('md5').update(str).digest("hex");

const files = [];
let css = '';

export class Component {}

export function createElement() {}

export function file(filename) {
  files.push(filename);
  return 'local://' + filename;
}

export function style(style) {
  const parsed = parseStyleObject(style);
  css += styleObjectToCSS(parsed);
  return parsed;
}

export function __finish() {
  const dir = __dirname;

  const outFiles = [];
  files.forEach((file, ind) => {
    var outfile = path.join(dir, 'file' + ind + path.extname(file));
    fs.writeFileSync(outfile, fs.readFileSync(file));
    outFiles.push([file, outfile]);
  });

  fs.writeFileSync(path.join(dir, 'styles.css'), css);

  fs.writeFileSync(path.join(dir, '__manifest.js'), 'module.exports = ' + JSON.stringify({
    files: outFiles,
    stylesheets: [ 'styles.css' ]
  }) + ';');
}

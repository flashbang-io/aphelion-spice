import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const hash = str => crypto.createHash('md5').update(str).digest("hex");

const files = [];

export class Component {}

export function createElement() {}

export function file(filename) {
  files.push(filename);
}

export function __finish() {
  const dir = __dirname;

  const outFiles = [];
  files.forEach((file, ind) => {
    var outfile = path.join(dir, 'file' + ind + path.extname(file));
    fs.writeFileSync(outfile, fs.readFileSync(file));
    outFiles.push([file, outfile]);
  });

  fs.writeFileSync(path.join(dir, '__manifest.json'), JSON.stringify({
    files: outFiles
  }));
}

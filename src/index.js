var path = require('path');
var fs = require('node-fs-extra');
var webpack = require('./webpack');
var cp = require('child_process');

exports.build = function(options, callback)
{
  /*fs.mkdirs(path.dirname(options.outfile), function (err) {
    var ws = fs.createWriteStream(options.outfile);
    var html = '<!doctype HTML>\\n<html>\\n  <head>\\n    <title>Hello world</title>\\n  </head>\\n  <body>\\n    <h1>Hello world</h1>\\n  </body>\\n</html>';
    ws.end('module.exports = function(locals) { return \'' + html + '\'; };');
    cb(null);
  });*/
  webpack({
    entry: options.entry,
    context: 'build',
    publicdir: options.publicdir,
    publicurl: options.publicurl
  }, function (err) {
    if (err) return callback(err);
    var proc = cp.fork(path.join(options.publicdir, '__build.js'));
    proc.on('exit', function () {
      webpack({
        entry: options.entry,
        context: 'server',
        publicdir: options.publicdir,
        publicurl: options.publicurl,
        outfile: options.outfile
      }, callback);
    });
  });
};

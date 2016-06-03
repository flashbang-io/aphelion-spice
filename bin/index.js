var path = require('path');
var fs = require('node-fs-extra');

exports.build = function(options, cb)
{
  fs.mkdirs(path.dirname(options.outfile), function (err) {
    var ws = fs.createWriteStream(options.outfile);
    ws.end('module.exports = function(locals) { return \'<html></html>\'; };');
    cb(null);
  });
};

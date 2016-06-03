var path = require('path');
var fs = require('fs');

exports.build = function(options)
{
  if (!fs.existsSync(path.dirname(options.outfile))) {
    fs.mkdirSync(path.dirname(options.outfile));
  }
  var ws = fs.createWriteStream(options.outfile);
  ws.end('module.exports = function(locals) { return \'<html></html>\'; };');
};

'use strict';

var loaderUtils = require('loader-utils');
var uid = require('uid');
var crypto = require('crypto');

function hash(str) {
	return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function (content) {
	this.cacheable && this.cacheable();
	var ext = loaderUtils.interpolateName(this, '[ext]', {});
	return 'var make = require(\'make\');\n\nmodule.exports = make.image(' + JSON.stringify(ext) + ', ' + JSON.stringify(hash(content.toString('base64'))) + ');';
};
module.exports.raw = true;
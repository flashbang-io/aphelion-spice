module.exports = function() {
	if (this.cacheable) this.cacheable();
  return 'var file = require(\'spice\').file;\n\nmodule.exports = file(\'' + this.resourcePath + '\');';
};
module.exports.raw = true;

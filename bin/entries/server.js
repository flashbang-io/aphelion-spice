'use strict';

var _view = require('view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function Page() {
  _classCallCheck(this, Page);

  this._html = '';
};

module.exports = function (locals) {
  var page = new Page();
  var view = new _view2.default(page);
  view.render();
  var html = page._html;
  return '<!doctype HTML>\n<html>\n  <head>\n    <title>Hello world</title>\n  </head>\n  <body>\n    ' + html + '\n  </body>\n</html>';
};
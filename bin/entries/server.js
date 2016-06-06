'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spiceBuild = require('spice-build');

var _spiceBuild2 = _interopRequireDefault(_spiceBuild);

var _spiceView = require('spice-view');

var _spiceView2 = _interopRequireDefault(_spiceView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
  function Page() {
    _classCallCheck(this, Page);

    this._title = 'Untitled';
    this._html = '';
  }

  _createClass(Page, [{
    key: 'html',
    value: function html() {
      return '<!doctype HTML>\n<html>\n  <head>\n    <title>' + this._title + '</title>\n' + _spiceBuild2.default.stylesheets.map(function (sheet) {
        return '    <link rel="stylesheet" type="text/css" href="/' + sheet + '" />';
      }).join('\n') + '\n  </head>\n  <body>\n    ' + this._html + '\n  </body>\n</html>';
    }
  }]);

  return Page;
}();

module.exports = function (locals) {
  var page = new Page();
  var view = new _spiceView2.default(page);
  view.render();
  return page.html();
};
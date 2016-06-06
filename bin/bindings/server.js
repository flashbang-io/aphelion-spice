'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElementHtml = require('../createElementHtml');

Object.defineProperty(exports, 'createElement', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createElementHtml).default;
  }
});
exports.style = style;
exports.file = file;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(page) {
    _classCallCheck(this, Node);

    this._page = page;
  }

  _createClass(Node, [{
    key: 'render',
    value: function render(html) {
      this._page._html = html;
    }
  }]);

  return Node;
}();

var Page = function () {
  function Page(page) {
    _classCallCheck(this, Page);

    this._page = page;
  }

  _createClass(Page, [{
    key: 'title',
    get: function get() {
      return this._page._title;
    },
    set: function set(title) {
      this._page._title = title;
    }
  }]);

  return Page;
}();

var Component = exports.Component = function () {
  function Component(page) {
    _classCallCheck(this, Component);

    this._rootNode = new Node(page);
    this._document = new Page(page);
  }

  _createClass(Component, [{
    key: 'page',
    get: function get() {
      return this._document;
    }
  }, {
    key: 'node',
    get: function get() {
      return this._rootNode;
    }
  }]);

  return Component;
}();

function style(style) {
  return function (sel) {
    return sel == '' ? 'className' : '';
  };
}

function file(filename) {}
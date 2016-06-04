'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.stringifyCss = stringifyCss;
exports.createElement = createElement;
exports.file = file;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentAPI = function () {
  function ComponentAPI(page) {
    _classCallCheck(this, ComponentAPI);

    this._page = page;
  }

  _createClass(ComponentAPI, [{
    key: 'render',
    value: function render(html) {
      this._page._html = html;
    }
  }]);

  return ComponentAPI;
}();

var Component = exports.Component = function () {
  function Component(page) {
    _classCallCheck(this, Component);

    this._rootNode = new ComponentAPI(page);
  }

  _createClass(Component, [{
    key: 'node',
    get: function get() {
      return this._rootNode;
    }
  }]);

  return Component;
}();

function flattenCss(key, value, styles) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    if (value.constructor === Array) {
      value.forEach(function (value2) {
        return flattenCss('', value2, styles);
      });
    } else {
      Object.keys(value).forEach(function (key2) {
        return flattenCss(key2, value[key2], styles);
      });
    }
  } else {
    if (key === '') return '';
    if (typeof value === 'number') value = value + 'px';
    styles.set(key, value);
  }
}

function stringifyCss(css) {
  var styles = new Map();
  flattenCss('', css, styles);
  var str = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = styles.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var key = _step$value[0];
      var value = _step$value[1];

      if (str !== '') str += ' ';
      str += key + ': ' + value + ';';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return str;
}

function concatChildren(children) {
  return children.reduce(function (str, child) {
    if (!child) return str;
    if (typeof child === 'string') return str + child;
    if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
      if (Array.isArray(child)) {
        return str + concatChildren(child);
      }
      return str + child;
    }
  }, '');
}

function createElement(tag, attribs) {
  if (attribs == null) attribs = {};
  var attrStr = Object.keys(attribs).reduce(function (str, attr) {
    var key = attr;
    var value = attribs[attr];
    if (key == 'style') {
      value = stringifyCss(value);
    }
    if (key == 'className') {
      key = 'class';
      if (value.constructor === Array) {
        value = value.join(' ');
      }
    }
    if (key == 'key' || value == null) {
      return str;
    }
    return str + ' ' + key + '="' + value + '"';
  }, '');

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var innerHtml = concatChildren(children);
  if (tag == 'br') {
    return '<' + tag + attrStr + ' />';
  }
  return '<' + tag + attrStr + '>' + innerHtml + '</' + tag + '>';
}

function file(filename) {}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._parseStyleObject = _parseStyleObject;
exports.parseStyleObject = parseStyleObject;
exports.styleObjectToCSS = styleObjectToCSS;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = function hash(str) {
  return _crypto2.default.createHash('md5').update(str).digest("hex");
};

function uncamel(camelCase) {
  return camelCase.replace(/[A-Z]/g, function (l) {
    return '-' + l.toLowerCase();
  });
}

function _parseStyleObject(obj) {
  if (Array.isArray(obj)) {
    if (obj.length > 0 && obj[0].charAt(0) == '~') {
      return obj;
    }
    var out = obj.map(function (o) {
      return _parseStyleObject(o);
    });
    out.unshift('~d');
    return out;
  } else {
    var keys = Object.keys(obj);
    if (keys.length == 0) return {};
    if (keys[0].indexOf('&') == -1) {
      var styles = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = obj[key];
        key = uncamel(key);
        // TODO: canonicalise key/value pair
        styles[key] = value;
      }
      var properties = Object.keys(styles);
      var _out = [];
      for (var _i = 0; _i < properties.length; _i++) {
        var prop = properties[_i];
        _out.push(prop);
        var _value = styles[prop];
        // TODO: canonicalise value
        _out.push(_value);
      }
      _out.unshift('~p');
      return _out;
    } else {
      keys.sort();
      var _out2 = [];
      for (var _i2 = 0; _i2 < keys.length; _i2++) {
        var selector = keys[_i2];
        _out2.push(selector);
        _out2.push(_parseStyleObject(obj[selector]));
      }
      _out2.unshift('~s');
      return _out2;
    }
  }
}

function parseStyleObject(style) {
  var parsed = _parseStyleObject(style);
  var id = hash(JSON.stringify(parsed)).substr(0, 12);
  return ['~n', id, parsed];
}

function styleObjectToCSS(obj, selector) {
  if (obj[0] == '~n') {
    return styleObjectToCSS(obj[2], selector || '._' + obj[1]);
  }
  if (obj[0] == '~s') {
    var out = '';
    for (var i = 1; i < obj.length; i += 2) {
      var sel = obj[i].replace('&', selector);
      out += styleObjectToCSS(obj[i + 1], sel);
    }
    return out;
  }
  if (obj[0] == '~p') {
    var _out3 = selector + ' {\n';
    for (var _i3 = 1; _i3 < obj.length; _i3 += 2) {
      _out3 += '  ' + obj[_i3] + ': ' + obj[_i3 + 1] + ';\n';
    }
    _out3 += '}\n';
    return _out3;
  }
}
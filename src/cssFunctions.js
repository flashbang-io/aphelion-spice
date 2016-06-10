import crypto from 'crypto';

const hash = str => crypto.createHash('md5').update(str).digest("hex");

function uncamel(camelCase) {
  return camelCase.replace(/[A-Z]/g, l => '-' + l.toLowerCase());
}

export function _parseStyleObject(obj) {
  if (Array.isArray(obj)) {
    if (obj.length > 0 && obj[0].charAt(0) == '~') {
      return obj;
    }
    const out = obj.map(o => _parseStyleObject(o));
    out.unshift('~d');
    return out;
  } else {
    const keys = Object.keys(obj);
    if (keys.length == 0) return {};
    if (keys[0].indexOf('&') == -1) {
      const styles = {};
      for (let i=0; i<keys.length; i++) {
        let key = keys[i];
        let value = obj[key];
        key = uncamel(key);
        // TODO: canonicalise key/value pair
        styles[key] = value;
      }
      const properties = Object.keys(styles);
      const out = [];
      for (let i=0; i<properties.length; i++) {
        const prop = properties[i];
        out.push(prop);
        let value = styles[prop];
        // TODO: canonicalise value
        out.push(value);
      }
      out.unshift('~p');
      return out;
    } else {
      keys.sort();
      const out = [];
      for (let i=0; i<keys.length; i++) {
        const selector = keys[i];
        out.push(selector);
        out.push(_parseStyleObject(obj[selector]));
      }
      out.unshift('~s');
      return out;
    }
  }
}

export function parseStyleObject(style) {
    const parsed = _parseStyleObject(style);
    const id = hash(JSON.stringify(parsed)).substr(0,12);
    return ['~n',id,parsed];
}

export function styleObjectToCSS(obj, selector) {
  if (obj[0] == '~n') {
    return styleObjectToCSS(obj[2], selector || '._' + obj[1]);
  }
  if (obj[0] == '~s') {
    let out = '';
    for (let i=1; i<obj.length; i+=2) {
      const sel = obj[i].replace('&', selector);
      out += styleObjectToCSS(obj[i + 1], sel);
    }
    return out;
  }
  if (obj[0] == '~p') {
    let out = selector + ' {\n';
    for (let i=1; i<obj.length; i+=2) {
      out += '  ' + obj[i] + ': ' + obj[i+1] + ';\n';
    }
    out += '}\n';
    return out;
  }
}

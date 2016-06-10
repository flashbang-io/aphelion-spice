function flattenCss(key, value, styles) {
  if (typeof value === 'object') {
    if (value.constructor === Array) {
      value.forEach(value2 => flattenCss('', value2, styles));
    } else {
      Object.keys(value).forEach(key2 => flattenCss(key2, value[key2], styles));
    }
  } else {
    if (key === '') return '';
    if (typeof value === 'number') value = value + 'px';
    styles.set(key, value);
  }
}

function stringifyCss(css) {
  const styles = new Map();
  flattenCss('', css, styles);
  let str = '';
  for (const [key, value] of styles.entries()) {
    if (str !== '') str += ' ';
    str += key + ': ' + value + ';';
  }
  return str;
}

function concatChildren(children) {
  return children.reduce((str, child) => {
    if (!child) return str;
    if (typeof child === 'string') return str + child;
    if (typeof child === 'object') {
      if (Array.isArray(child)) {
        return str + concatChildren(child);
      }
      return str+ child;
    }
  }, '');
}

export default function createElement(tag, attribs, ...children) {
  if (attribs == null) attribs = {};
  const attrStr = Object.keys(attribs).reduce((str, attr) => {
    let key = attr;
    let value = attribs[attr];
    if (key == 'style') {
      key = 'class';
      value = '_' + value[1];
    }
    if (key == 'key' || value == null) {
      return str;
    }
    return str + ' ' + key + '="' + value + '"';
  }, '');
  const innerHtml = concatChildren(children);
  if (tag == 'br') {
    return `<${tag}${attrStr} />`;
  }
  return `<${tag}${attrStr}>${innerHtml}</${tag}>`;
}

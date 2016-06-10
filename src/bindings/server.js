import { styleObjectToCSS, parseStyleObject } from '../cssFunctions';

class Node {
  constructor(page) {
    this._page = page;
  }

  render(html) {
    this._page._html = html;
  }
}

class Page {
  constructor(page) {
    this._page = page;
  }

  get title() {
    return this._page._title;
  }

  set title(title) {
    this._page._title = title;
  }
}

export class Component {
  constructor(page) {
    this._rootNode = new Node(page);
    this._document = new Page(page);
  }

  get page() {
    return this._document;
  }

  get node() {
    return this._rootNode;
  }
}

export { default as createElement } from '../createElementHtml';

export function style(style) {
  const parsed = parseStyleObject(style);
  return parsed;
}

export function file(filename) {}

import View from 'view';

class Page
{
  constructor() {
    this._html = '';
  }
}

module.exports = function(locals) {
  const page = new Page();
  const view = new View(page);
  view.render();
  const html = page._html;
  return '<!doctype HTML>\n<html>\n  <head>\n    <title>Hello world</title>\n  </head>\n  <body>\n    ' + html + '\n  </body>\n</html>';
};

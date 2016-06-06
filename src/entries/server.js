import buildData from 'spice-build';
import View from 'spice-view';

class Page
{
  constructor() {
    this._title = 'Untitled';
    this._html = '';
  }

  html() {
    return `<!doctype HTML>
<html>
  <head>
    <title>${this._title}</title>
${ buildData.stylesheets.map(sheet => (
      `    <link rel="stylesheet" type="text/css" href="/${sheet}" />`
    )).join('\n') }
  </head>
  <body>
    ${this._html}
  </body>
</html>`;
  }
}

module.exports = function(locals) {
  const page = new Page();
  const view = new View(page);
  view.render();
  return page.html();
};

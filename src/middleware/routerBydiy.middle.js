const { readFile } = require(`${__PATH}/util/file.util`);

let render = async url => {
  const page = url.split('/').pop();
  let tpl = 'index';
  switch (page) {
    case 'hello':
      path = 'hello';
      break;
    default:
  }
  html = await readFile(`src/view/${page}.html`);
  return html;
};
module.exports = () => {
  return async (ctx, next) => {
     const html = await render(ctx.request.url);
    ctx.body = html;
     next && next();
  };
};
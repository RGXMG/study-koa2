const fs = require('fs');
const Router = require('koa-router');
const { readFile } = require(`${__PATH}/util/file.util`);
const { getPostParams } = require(`${__PATH}/util/method.util`);
const { urlParamsToJSON } = require(`${__PATH}/util/data.util`);
const { excuteAllSqlFile } = require(`${__PATH}/databases/index`);
// 总路由
const home = new Router();
home.get('/', async ctx => {
  console.log(' index');
  const html = await readFile(`${__PATH}/view/index.html`);
  ctx.body = html;
});

// 子路由
const login = new Router();
login.get('/', async ctx => {
  ctx.body = 'user';
});
login.get('/login', async ctx => {
  const html = await readFile(`${__PATH}/view/login.html`);
  ctx.body = html;
  excuteAllSqlFile();
});
login.post('/login', async ctx => {
  console.log('login POST');
  // NOTE 自定义解析POST方法
  //const params = await getPostParams(ctx);
  //const data = urlParamsToJSON(params);

  // NOTE  直接用插件解析后
  const data = ctx.request.body;
  console.log(fs.readdirSync(`${__PATH}`));
  ctx.body = decodeURIComponent(JSON.stringify(data));
});
login.get('/register', async ctx => {
  console.log('register');
  const html = await readFile(`${__PATH}/view/hello.html`);
  ctx.body = html;
});

const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/user', login.routes(), login.allowedMethods());

module.exports = () => {
  return router;
};
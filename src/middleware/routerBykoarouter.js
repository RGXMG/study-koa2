const Router = require('koa-router');
const { readFile } = require(`${__PATH}/util/file.util`);

// home router
const home = new Router();
home.get('/', async ctx => {
  const html = await readFile(`${__PATH}/view/index.html`);
  ctx.body = html;
});

const login = new Router();
login.get('/login', async => {

});

const register = new Router();
register.get('/register', async => {

});

const router = new Router();
router.use('/', home, home.allowedMethods())
  .use('/login', login, login.allowedMethods())
  .use('/register', register, register.allowedMethods());

module.exports = router;
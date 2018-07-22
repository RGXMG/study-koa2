const path = require('path');
global.__PATH = path.resolve(__dirname);
const koa = require('koa');
const koaParser = require('koa-bodyparser');

//const koaStatic = require('koa-static');
const app = new koa();
// 自定义Router
//const routerByDiy = require('./middleware/routerBydiy.middle');

// 利用koa-router插件
const routerByKoaRouter = require('./middleware/routerBykoarouter.middle');

// 解析post方法的data中间件
app.use(koaParser());
app.use(routerByKoaRouter().routes()).use(routerByKoaRouter().allowedMethods());

//app.use(koaStatic(path.join(__dirname, '../src')));

app.listen(3000);
console.log('koa server is listen 3000');
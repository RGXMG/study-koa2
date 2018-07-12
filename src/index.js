const path = require('path');
global.__PATH = path.resolve(__dirname);
const koa = require('koa');
const app = new koa();
const router = require('./middleware/routerBydiy.middle');

app.use(router());

app.listen(3000);
console.log('koa server is listen 3000');
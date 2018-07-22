// 从node原生req对象中获取post方法传递的参数
const getPostParams = ctx => {
  let resData = '';
  return new Promise((resolve, reject) => {
    try {
      ctx.req.addListener('data', data => {
        resData += data
      });
      ctx.req.addListener('end', () => resolve(resData));
    } catch  (e) {
      reject(e);
    }

  })
};
module.exports = {
  getPostParams,
};
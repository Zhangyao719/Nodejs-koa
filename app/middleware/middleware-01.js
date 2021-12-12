// 这种包装可以在调用的时候 在最外层传递一些其他的参数
module.exports = () => {
  return async function (ctx, next) {
    console.log('middleware1');
    await next()
  }
}
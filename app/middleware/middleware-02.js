module.exports = () => {
  return async function (ctx, next) {
    console.log('middleware1');
    await next()
  }
}
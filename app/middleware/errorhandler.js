module.exports = () => {
  return async function (ctx, next) {
      try {
        await next();
      } catch (err) {
        console.log('🚀 → err', err)
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
          message: err.message
        };
      }
  }
}
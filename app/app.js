const koa = require('koa')
const route = require('./route/v1')
const compose = require('koa-compose')
const koaBody = require('koa-body');
const middle1 = require('./middleware/middleware-01')
const middle2 = require('./middleware/middleware-02')
const errorHandler = require('./middleware/errorhandler')

const app = new koa()

// 挂载中间件
// 1.错误中间件
app.use(errorHandler())
// 2. 使用koa-compose 调用多个中间件
app.use(compose([middle1(), middle2()]))

app.use(koaBody({ multipart: true }));  // 代表我们上传的是文件

// 挂载路由
Object.keys(route).forEach(r => {
  app.use(route[r])
})

app.listen(8001)
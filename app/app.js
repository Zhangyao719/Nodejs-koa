const koa = require('koa')

const route = require('./route/v1')

const app = new koa()

Object.keys(route).forEach(r => {
  // 挂载路由
  app.use(route[r])
})

app.listen(8001)
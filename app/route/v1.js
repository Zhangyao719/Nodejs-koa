// 路由模块
const route = require('koa-route')
// 静态资源模块
const path = require('path')
const static = require('koa-static')

// const main = (ctx) => {
//   console.log(111, ctx.req);
//     // 设置content-type
//   	ctx.response.type = 'html'
//     // 设置响应体
//   	ctx.response.body = '<a href="https://www.baidu.com">链接</a>'
// }

const index = route.get('/', (ctx) => {
  ctx.response.body = 'hello world'
})

const login = route.get('/login', (ctx) => {
  ctx.response.body = 'login'
})

const user = route.get('/user', (ctx) => {
  ctx.response.body = 'user'
})

// 重定向
const redirect = route.get('/redirect', (ctx) => {
  ctx.response.redirect('/');
})

/**
 * 使用koa-static模块: (无需再配置路由路径)
 * 参数一: 当前静态文件的目录路径
 */
const image = static(path.resolve('..', 'resource/images'))

module.exports = {
  index,
  login,
  user,
  image,
  redirect,
};
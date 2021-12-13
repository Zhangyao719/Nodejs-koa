// 路由模块
const route = require('koa-route')
// koa-body模块
const koaBody = require('koa-body')
// 静态资源模块
const path = require('path')
const static = require('koa-static')

const os = require('os');
const fs = require('fs');

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

// koa自带方式处理post
const post = route.post('/post', (ctx) => {
  // ctx.response.body = 'user'
  let dataArr = [];
  // 注册data事件 获取Buffer数据流
  ctx.req.addListener('data', (data) => {
    dataArr.push(data);
  });
  let res;
  // 存储完成后合并
  ctx.req.addListener('end', () => {
    res = Buffer.concat(dataArr).toString();
    console.log(11, res)
  });
  ctx.response.body = 'aa'
})

// 使用koa-body模块处理post
const body = route.post(
  '/body',
  koaBody(), // 路由独享中间件
  (ctx) => {
    console.log(ctx.request.body);
    // => POST body
    ctx.body = JSON.stringify(ctx.request.body);
  }
)

// 文件上传
const uploader = route.post('/upload', (ctx) => {
  const tmpdir = os.tmpdir(); 
  const filePaths = [];
  const files = ctx.request.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }
  ctx.body = filePaths;
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
  post,
  body,
  uploader,
  image,
  redirect,
};
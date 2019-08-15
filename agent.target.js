const Koa = require('koa')
const app = new Koa()
app.use(async(ctx, next) => {
  if(ctx.request.url === '/') {
    ctx.response.body = new Date()
  }
})
app.listen(8887, '127.0.0.1', ()=> {
  console.log('histen on: http://127.0.0.1:8887')
})
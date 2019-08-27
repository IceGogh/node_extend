const Koa = require('koa');
const app = new Koa()
// const cheerio = require('cheerio')
const superagent = require('superagent')
const targetHost = 'http://siemensgabor.com/'

app.use(async ctx => {
  if(ctx.request.url === '/') {
    const s = new Promise((resolve, reject) => {
      superagent
      .get(targetHost)
      .then(s=> {
        resolve(s)
      })
      .catch(e=>{
        resolve('err：' + e)
      })
    })
    ctx.response.body = await s
  }
})
app.listen(9999)
const Koa = require('koa')
const app = new Koa()
const cheerio = require('cheerio')

const hot = []
let s = ''
const getHotNews = res => {
  const $ = cheerio.load(res.text)
  $('#newsList ul li a').each((index, element) => {
    const news = {
      title: $(element).text(),
      href: $(element).attr('href')
    }
    hot.push(news)
  })
  s = res.text
  return res.text
}

const superagent = require('superagent')
const targetHost = 'https://www.zhihu.com/'
superagent.get(targetHost).end((err, res) => {
  if (err) {
    console.log(`获取${targetHost}内容失败: ${err}`)
  }
  getHotNews(res)
})


app.use(async (ctx, next) => {
  const u = ctx.request.url
  if (u === '/') {
    ctx.response.body = 'Hi~'
  } else if (u === '/ifeng') {
    ctx.response.body = hot
  }
})

app.listen(8889, '127.0.0.1', () => {
  console.log('listen on: http://127.0.0.1:8889')
})


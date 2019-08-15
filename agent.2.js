const Koa = require('koa');
const app = new Koa()
// const cheerio = require('cheerio')
const superagent = require('superagent')
const targetHost = 'http://siemensgabor.com/'
const contents = []
superagent.get(targetHost).end((err, res) => {
  if(err) {
    return console.log(`获取${targetHost}内容失败: ${err}`)
  }
  console.log('res: ', res)
})

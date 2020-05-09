const Koa = require("koa");
const app = new Koa();
const cheerio = require("cheerio");
const superagent = require("superagent");
const prefix = require('superagent-prefix')('/heifetz')
// 分析热点新闻列表
const getHotNews = (res) => {
  const hot = [];
  const $ = cheerio.load(res);
  $("#newsList ul li a").each((index, element) => {
    const news = {
      title: $(element).text(),
      href: $(element).attr("href"),
    };
    hot.push(news);
  });
  return hot;
};

// const targetHost = "https://www.quora.com/";
const targetHost = 'https://www.tiankele.cn'

// 抓取内容
const superagentFn = () => {
  return new Promise((resolve, reject) => {
    superagent
      .get(targetHost)
      .set('referer', 'https://www.zhihu.com/')
      // .use(prefix)
      .set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36')
      .end((err, res) => {
      if (err) {
        console.log(`获取失败: ${err}`);
        resolve(`获取失败: ${err}`)
      }
      console.log(res)
      // console.log(res.body.toString())
      // resolve(res.body.toString())
      resolve(res.toJSON().text);
    });
  });
};

app.use(async (ctx, next) => {
  const u = ctx.request.url;
  if (u === "/") {
    ctx.request.header['referer'] = 'https://www.zhihu.com/'
    ctx.request.header['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36'
    const result = await superagentFn();
    ctx.response.body = result;
  } else if (u === "/hot") {
    const result = getHotNews(await superagentFn());
    ctx.response.body = result;
  } else {
    ctx.response.body = "404 page";
  }
});

app.listen(8889, () => {
  console.log("http://localhost:8889");
});

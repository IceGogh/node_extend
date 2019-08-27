const Koa = require('koa')
var superagent = require('superagent');
let s = ''

(function *ss(){
  superagent.get('http://www.cnblogs.com')
  .end(function (err, res) {
      if (err) {
          return console.log(err);
      }
       s = res
  });
})()

var app = new Koa();
app.use(async ctx => {
  if(ctx.request.url === '/') {
    ctx.request.body =s
  }
})


app.listen(4000, function () {
    console.log('app is listenling at port 4000');
});
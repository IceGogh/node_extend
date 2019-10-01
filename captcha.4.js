const express = require('express')
const app = new express()
const svgCaptcha = require('svg-captcha')
const getCaptcha = (req, res, next) => {
  var captcha = svgCaptcha.createMathExpr({
    mathMin: 1,
    mathMax: 50
  });
  res.type('svg');
  res.status(200).send(captcha.data);
}
app.use((req, res) => {
  if(req.path === '/') {
    res.json({code: 123})
  }
  if(req.path === '/c') {
    return getCaptcha(req, res)
  }
  if(req.path === '/image') {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/captcha.1.html`)
  }
})
app.listen(9998)
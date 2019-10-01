const express = require('express')
const app = new express()
const svgCaptcha = require('svg-captcha')
const getCaptcha = (req, res, next) => {
  const captcha = svgCaptcha.createMathExpr({
    inverse: false,
    fontSize: 36,
    noise: 2,
    width: 90,
    height: 40,
  })
  const c = captcha.text
  console.log('c:', c)
  res.setHeader('Content-Type', 'image/svg+xml')
  res.write(String(captcha.data))
  res.end()
}
app.use((req, res) => {
  if(req.path === '/') {
    res.json({code: 123})
  }
  if(req.path === '/c') {
    return getCaptcha(req, res)
  }
})
app.listen(9998)
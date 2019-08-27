const request = require('request')
const fs = require('fs')
const timeInit = t => {
  const m = t.getMonth()
  const d = t.getDate()
  const M = m < 10 ? '0' + m : m
  const D = d < 10 ? '0' + d : d
  return M + '.' + D
}
const img_src = 'https://car2.autoimg.cn/cardfs/product/g21/M15/A9/5D/1024x0_1_q95_autohomecar__wKgFWlhT8MCAbchfAAUR9OHcDrw795.jpg'
request(img_src).pipe(fs.createWriteStream(__dirname + '/img.' + timeInit(new Date()) + '.jpg'))
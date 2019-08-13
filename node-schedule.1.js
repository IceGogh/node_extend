const schedule = require('node-schedule')
const duler = () => {
  // 每分钟的 第20s 
  schedule.scheduleJob('1-40 * * * * * ', () => {
    console.log(new Date(), new Date().getSeconds())
  })
  // 每分钟的 1-20 second 内
  // schedule.scheduleJob('1-20 * * * * *', () => {
  //   console.log(new Date(), new Date().getSeconds())
  // })
}
duler()
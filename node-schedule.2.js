const schedule = require('node-schedule')
/*
  second
  minute
  hour  (0 - 23)
  dayOfMonth  (1 - 31)
  month (1 - 12)
  dayOfWeek (0 - 7) (0 or 7 is Sunday)
*/

// 每分的 20 s 执行
// const rules = {
//   second: 20
// }

// 每小时 第27分 第30秒 执行
const rules = {
  second: 30,
  minute: 27
}
const duler = r => {
  schedule.scheduleJob(r, () =>{
    console.log(new Date(), new Date().getSeconds())
  })
}

duler(rules)
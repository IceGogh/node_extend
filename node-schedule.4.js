const schedule = require('node-schedule')
const duler = () => {
  schedule.scheduleJob('1-40 * * * * *', 'node test.1.js')
}
duler()
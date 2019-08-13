const schedule = require('node-schedule')
const duler = () => {
  let t = 0
  const jober = schedule.scheduleJob('1-30 * * * * *', () => {
    t++
    if (t > 40) {
      console.log('cancel')
      jober.cancel()
    } else {
      console.log(`t: ${t}, ${new Date()}`)
    }
  })
}

duler()
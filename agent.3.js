const superagent = require('superagent')
const schedule = require('node-schedule')

const reqFn = () => {
  console.log('start: ', new Date())
  superagent.get('http://127.0.0.1:8887').end((err, res) => {
    if(err) {
      return console.log('err: ', err)
    }
    console.log('end: ', new Date())
    console.log('res: ', res.body)
  })
}

(()=>{
  schedule.scheduleJob('1-50 * * * * *', ()=>{
    console.log('schedule start: ', new Date())
    reqFn()
  })
})()
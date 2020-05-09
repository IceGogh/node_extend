const figlet = require('figlet')
const sleep = require('@gogh/sleep')
console.log(process.argv[2])
figlet.text('wanrong', {
  font: 'Standard'
}, async (err, data) => {
  console.log('ready')
  await sleep(2000)
  console.log(data)
})
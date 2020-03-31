const figlet = require('figlet')
figlet.text('tiankele server here~', {
  font: 'Standard'
}, (err, data) => {
  console.log(data)
})
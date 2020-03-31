const Express = require('express')
const app = new Express()
const figlet = require('figlet')
const chalk = require('chalk')
const w = 'tiankele~'
console.log(chalk.hex('#00c58e')(w))
console.log(chalk.keyword('orange')('Yay for orange colored text!'));
console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk.red(chalk.bold.underline('Bold gray!')));
app.get('/figlet', (req, res) => {
  figlet.text(w, {
    font: 'Standard'
  }, (err, data) => {
    res.send(data)
  })
})
app.listen(10001)
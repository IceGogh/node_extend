const shell = require('shelljs')
const order = `diff -B ./a.js ./a2.js`
shell.exec(order)
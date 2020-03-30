const shell = require('shelljs')
if(shell.exec('git add -A').code !== 0) {
  shell.echo('Error: Git command err')
  shell.exit(1)
}
shell.exec('git commit -m "#shell# auto commit"')
shell.exec('git push')
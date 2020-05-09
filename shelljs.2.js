const shell = require('shelljs')

if(!shell.which('react')) {
  shell.echo('Sorry, git not find')
  shell.exit(1)
} else {
  const res = shell.which('npm')
  console.log(typeof res)
}
console.log('git here~')
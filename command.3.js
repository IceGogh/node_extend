const program = require('commander')
program
  .version('2.3.2, "-v, -V', '当前版本号')
  .name('@gogh/tool')
  .usage("[options] [command]")
  .helpOption('-h, --help', '获取工具说明帮助')
  .command("hi", "say hi to test~")

program.on('command:hi', () => {
  console.log('hi there~~~')
})

program.parse(process.argv)
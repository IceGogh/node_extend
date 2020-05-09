#!/usr/bin/env node
const program = require("commander");
program
  .version("2.3.2")
  .name("@gogh/tool")
  .usage("[options] [command]")
  .helpOption("-h, --help", "获取工具说明帮助")
  .command("init", "初始化nginx.conf路径配置文件")
  .command("test2 <sub0> <sub1>", "测试test2");
program.on("command:sayhi", async () => {
  console.log("hi there~~~");
});
program.on("command:test2", (arr) => {
  console.log("arr: ", arr);
});
program.on("command:init", async () => {
  console.log('init: ')
});
program.parse(process.argv);

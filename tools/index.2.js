#!/usr/bin/env node
const program = require("commander");
const command = require("child_process");
// 打开浏览器
let openChrome = function () {
  let cmd;
  if (process.platform === "win32") {
    cmd = "start";
  } else if (process.platform === "linux") {
    cmd = "xdg-open";
  } else if (process.platform === "darwin") {
    cmd = "open";
  }
  command.exec(cmd + " http://www.tiankele.cn");
};
program
  .version("2.3.2")
  .usage("[option]", "--type required, --mode required")
  .option("--type [typeName]", "type: dev && build")
  .option("--mode [nodeMode]", "pls choose nodeMode to run up")
  .parse(process.argv);
console.log("process.argv: ", process.argv);
const { type, mode } = program;
console.log("mode: ", mode);
if (type === "dev") {
  console.log("do something", type);
} else if (type === "build") {
  openChrome();
  console.log("do something", type);
} else {
  console.log("params error");
  // program.help();
}

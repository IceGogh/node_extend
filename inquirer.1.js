var inquirer = require("inquirer");
const envList = ["pro", "test", "dev", "pre-prd"];
const questions = [
  {
    name: "env",
    type: "rawlist",
    message: `请选择需要注销的测试环境`,
    choices: envList
  }
];
(async () => {
  const s = await inquirer.prompt(questions);
  console.log(typeof s, s)  // object { env: 'test' }
})();

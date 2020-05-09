const sleep = require("./index");
console.log("st: ", new Date());
(async () => {
  await sleep('ass');
  console.log("ed: ", new Date());
})();

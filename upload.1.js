const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/upload") {
      
      let reqs = "";
      // req.setEncoding("binary");
      req.on("data", data => {
        reqs += data;
      });
      req.on("end", () => {
        const path = `${__dirname}/upload`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        fs.writeFile(`${__dirname}/upload/111.png`, reqs, function(
          err
        ) {
          if (err) {
            console.log("down fail");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(JSON.stringify(err));
          } else {
            console.log("down success");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            console.log(reqs)
            res.end(JSON.stringify(reqs));
          }
        });
      });
    }
  })
  .listen(7777);

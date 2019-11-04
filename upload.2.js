const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const pathFn = require("path");
http
  .createServer((req, res) => {
    if (req.url === "/upload" && req.method === "POST") {
      const form = new formidable.IncomingForm();
      const savePath = pathFn.join(__dirname, "/upload");
      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
      }
      form.uploadDir = savePath;
      form.parse(req, (err, fields, files) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const { path, name } = files.avatar;
        console.log(path, "\n", name);
        fs.rename(path, pathFn.join(savePath, "/", name), err => {
          if (err) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(err);
          }
          console.log(req)
          if (req.headers["sec-fetch-mode"]) {
            console.log("sec-fetch-mode: \n", req.headers["sec-fetch-mode"]);
            if (req.headers["sec-fetch-mode"] === "navigate") {
              res.writeHead(302, { Location: "./upload-ok" });
              res.end();
            } else if (req.headers["sec-fetch-mode"] === "cors") {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ code: 200, msg: "上传成功" }));
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  code: 200,
                  data: req.headers["sec-fetch-mode"],
                  msg: "上传成功"
                })
              );
            }
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.headers));
          }
        });
      });
    } else if (req.url === "/user-ajax") {
      const html = fs.readFileSync("./upload.ajax.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
      res.end(html);
    } else if (req.url === "/user-form") {
      const html = fs.readFileSync("./upload.form.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
      res.end(html);
    } else if (req.url === "/upload-ok") {
      const html = fs.readFileSync("./upload.ok.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
      res.end(html);
    } else {
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
      res.end("No found!");
    }
  })
  .listen(7777);

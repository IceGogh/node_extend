const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const pathFn = require("path");
http
  .createServer((req, res) => {
    if (req.url === "/upload" && req.method === "POST") {
      const form = new formidable.IncomingForm();
      const savePath = pathFn.join(__dirname, "/upload");
      // 检查文件加是否已经存在 这里用同步方法
      // if (!fs.existsSync(savePath)) {
      //   fs.mkdirSync(savePath);
      // }
      fs.existsSync(savePath) || fs.mkdirSync(savePath)
      form.uploadDir = savePath;
      form.parse(req, (err, fields, files) => {
        res.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" });
        // 取文件路径 和 文件名字
        const { path, name } = files.avatar;
        // 重命名
        fs.rename(path, pathFn.join(savePath, "/", name), err => {
          if (err) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(err);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({code: 200, data: '/upload/' + name}));
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

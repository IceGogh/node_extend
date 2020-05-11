const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const { resolve } = require("path");
const app = http.createServer();
const savePath = resolve(__dirname, "./upload");
const mergeFileChunk = require("./stream.1");

app.on("request", async (req, res) => {
  if (req.url === "/") {
    const html = fs.readFileSync("./upload.3.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
    res.end(html);
  } else if (/^\/upload\/chunk\d/.test(req.url) && req.method === "POST") {
    const form = new formidable.IncomingForm();
    fs.existsSync(savePath) || fs.mkdirSync(savePath);
    form.uploadDir = savePath;
    form.parse(req, async (err, fields, files) => {
      const chunk = files.chunk;
      const sub = fields.sub;
      const filename = fields.filename;
      fs.renameSync(chunk.path, resolve(savePath, "./", sub + "." + filename));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: 200 }));
    });
  } else if (req.url === "/merge" && req.method === "POST") {
    await mergeFileChunk(
      resolve(__dirname, "./uploads/nodejs.pdf"),
      1024 * 1024
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ code: 200, msg: "merged!" }));
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
    res.end("No found!");
  }
});

app.listen(7778);

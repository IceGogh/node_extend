const http = require("http");
const fs = require("fs");
const Formidable = require("formidable");
const { resolve } = require("path");

const app = http.createServer();
// 暂存目录
const stagedPath = resolve(__dirname, "./staged");
// 保存目录
const savePath = resolve(__dirname, "./upload");
const mergeFileChunk = require("./upload.merge");

app.on("request", async (req, res) => {
  // index 上传页面
  if (req.url === "/") {
    const index = fs.readFileSync("./upload.big.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF8" });
    res.end(index);
  } else if (
    // 上传切片接口
    /^\/upload\/chunk\d/.test(req.url) &&
    req.method === "POST"
  ) {
    const form = new Formidable.IncomingForm();
    // (同步)判断存储文件夹是否存在 or 创建
    fs.existsSync(stagedPath) || fs.mkdirSync(stagedPath);
    fs.existsSync(savePath) || fs.mkdirSync(savePath);

    form.uploadDir = stagedPath;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ code: 500, err }));
      }
      const chunk = files.chunk;
      const { sub, filename } = fields;
      // (同步)重命名
      fs.renameSync(
        chunk.path,
        resolve(stagedPath, "./", sub + "." + filename)
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ code: 200, sub, msg: `[chunk-${sub}] 上传成功` })
      );
    });
  } else if (req.url === "/merge-chunk" && req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", async () => {
      const data = JSON.parse(body);
      const { filename, size } = data;
      try {
        await mergeFileChunk(resolve(savePath, filename), size);
      } catch (err) {
        console.log("err", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ code: 500, err }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: 200, msg: "合并成功" }));
    });
  }
});

app.listen(7778);

const fs = require("fs");
const { resolve } = require("path");
const UPLOAD_DIR = resolve(__dirname, "./upload");
const chunkSize = 1024 * 1024;

const pipeStream = (path, writeStream) => {
  new Promise((resolve) => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

// 合并切片
const mergeFileChunk = (filePath, filename, size) => {
  const chunkDir = resolve(UPLOAD_DIR, filename);
  const chunkPaths = fs.readdirSync(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  chunkPaths.map((chunkPath, index) => {
    pipeStream(
      resolve(chunkDir, chunkPath),
      // 指定位置创建可写流
      fs.createWriteStream(filePath, {
        start: index * size,
        end: (index + 1) * size,
      })
    );
  });
  //   fs.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

mergeFileChunk(UPLOAD_DIR, "", chunkSize);

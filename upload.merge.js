const fs = require("fs");
const { resolve } = require("path");
const STAGED_DIR = resolve(__dirname, "./staged");

const pipeStream = (path, writeStream) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      console.log("unlink path: ", path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

const mergeFileChunk = async (filePath, size) => {
  const chunkPaths = fs.readdirSync(STAGED_DIR);
  // 排序
  chunkPaths.sort((a, b) => a.split(".")[0] - b.split(".")[0]);
  await Promise.all(
    chunkPaths.map(async (chunkPath, index) => {
      await pipeStream(
        resolve(STAGED_DIR, chunkPath),
        // 指定位置创建可写流
        fs.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  console.log(`rmdir ${STAGED_DIR}`);
  fs.rmdirSync(STAGED_DIR); // 合并后删除保存切片的目录
};

module.exports = mergeFileChunk;

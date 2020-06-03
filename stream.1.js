const fs = require("fs");
const { resolve } = require("path");
const UPLOAD_DIR = resolve(__dirname, "./upload");
const newFile = resolve(__dirname, "./uploads/nodejs.pdf");
const size = 1024 * 1024;
// // 写入流
// const writeStream = (index) => {
//   fse.createWriteStream(newFile, {
//     start: index * size,
//     end: (index + 1) * size,
//     encoding: "utf8",
//   });
// };
// // 读取流
// const readStream = fs.createReadStream(file);
// readStream.on("end", () => {
//   fs.unlinkSync(file);
// });

// // 管道
// readStream.pipe(writeStream);

const pipeStream = (path, writeStream) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      console.log("unlink path: ", path);
      resolve();
    });
    console.log("pipe~~");
    readStream.pipe(writeStream);
  });
};

const mergeFileChunk = async (filePath, size) => {
  const chunkPaths = fs.readdirSync(UPLOAD_DIR);
  //   chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      pipeStream(
        resolve(UPLOAD_DIR, chunkPath),
        // 指定位置创建可写流
        fs.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  fs.rmdirSync(UPLOAD_DIR); // 合并后删除保存切片的目录
};

// mergeFileChunk(newFile, size);
module.exports = mergeFileChunk;

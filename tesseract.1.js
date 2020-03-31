var tesseract = require("node-tesseract");
const { resolve } = require("path");
const imgSrc = resolve(__dirname, "verifyCode.1.png");
// Recognize text of any language in any format
tesseract.process(imgSrc, function(err, text) {
  if (err) {
    console.error(err);
  } else {
    console.log(text);
  }
});

// Recognize German text in a single uniform block of text and set the binary path

// var options = {
//     l: 'deu',
//     psm: 6,
//     binary: '/usr/local/bin/tesseract'
// };

// tesseract.process(__dirname + '/verifyCode.png', options, function(err, text) {
//     if(err) {
//         console.error(err);
//     } else {
//         console.log(text);
//     }
// });

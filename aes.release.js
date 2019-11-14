var crypto = require('crypto');

var algorithm = 'aes-128-cbc';
var clearEncoding = 'utf8';
const iv = 'e6db271db12d4d47'
const key = '9cd5b4cf89949207'
var cipherEncoding = 'base64';
let cipherChunks= [ '1XGTj+KVFWA1lIwnBqDl29jTFPjxxTuJDp1catix0CcCmzMYY6wn6QJ1HFuY1bk1/yK8AnstAjxGfL5eX3yK',
'5Opou5m5x5t9VX4v5AQL32I=' ]
// let cipherChunks = [ '', '74uOL5m1jYS0zE0/zK1EAQ==' ]
cipherChunks = cipherChunks.join('')

var decipher = crypto.createDecipheriv(algorithm, key, iv);
const s = decipher.update(cipherChunks, cipherEncoding, clearEncoding) + decipher.final(clearEncoding)
console.log('s: ', s)
// var plainChunks = [];
// for (var i = 0; i < cipherChunks.length; i++) {
//   plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
//   console.log('plainChunks: ', plainChunks)

// }
// plainChunks.push(decipher.final(clearEncoding));
// console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
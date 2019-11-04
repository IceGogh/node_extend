var crypto = require('crypto');

// var data = "4535292@QQ.COM";
const data = '4535292@qq.com'
console.log('Original cleartext: ' + data);
var algorithm = 'aes-128-cbc';
var clearEncoding = 'utf8';
const iv = 'e6db271db12d4d47'
// length of key is 16 of 128 bit
const key = '9cd5b4cf89949207'
//var cipherEncoding = 'hex';
//If the next line is uncommented, the final cleartext is wrong.
var cipherEncoding = 'base64';
var cipher = crypto.createCipheriv(algorithm, key, iv);

var cipherChunks = [];
cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
cipherChunks.push(cipher.final(cipherEncoding));
console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));

var decipher = crypto.createDecipheriv(algorithm, key, iv);
var plainChunks = [];
for (var i = 0; i < cipherChunks.length; i++) {
  plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));

}
plainChunks.push(decipher.final(clearEncoding));
console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
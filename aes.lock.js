var crypto = require('crypto');

const data = '2222212@saswcom2222212@saswcom122222212@saswcom2222212@saswcom12'
// const data = "1@1.com"
console.log('Original cleartext: ' + data);
var algorithm = 'aes-128-cbc';
var clearEncoding = 'utf8';
const iv = 'e6db271db12d4d47'
const key = '9cd5b4cf89949207'
var cipherEncoding = 'base64';
var cipher = crypto.createCipheriv(algorithm, key, iv);

var cipherChunks = [];
cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
cipherChunks.push(cipher.final(cipherEncoding));
console.log('cipherChunks: ', cipherChunks)
console.log('data.length: ', data.length)
console.log('cipherChunks[1].length: ', cipherChunks[0].length)
console.log('cipherChunks[2].length: ', cipherChunks[1].length)
const s = cipherChunks.join('')
console.log('s.length: ', s.length)
console.log('result: ', s);

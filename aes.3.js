const hash = "riX6dKnCg8vOt+Z3LxnM/oZThZEjOSUQJR9v+DSDY3E=";
const iv = "e6db271db12d4d47";
// length of key is 16 of 128 bit
const key = "9cd5b4cf89949207";
const crypto = require("crypto");
const aesDecrypt = function(data, secretKey, iv) {
  const cipherEncoding = "base64";
  const clearEncoding = "utf8";
  const cipher = crypto.createDecipheriv("aes-128-cbc", secretKey, iv);
  return (
    cipher.update(data, cipherEncoding, clearEncoding) +
    cipher.final(clearEncoding)
  );
};

console.log(aesDecrypt(hash, key, iv)); // base64-encoded-encrypted-data

const CryptoJS = require('crypto-js');
const key = process.env.CRYPTO_KEY;

exports.encrypt = (content) => {
  const encryptedContent = CryptoJS.AES.encrypt(content, key);
  return encryptedContent.toString();
};

exports.decrypt = (encryptedContent) => {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

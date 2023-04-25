const crypto = require("crypto");
const { platform } = require("os");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// encrypt data with public key

function encrypt(plainText) {
  const cipherText = crypto.publicEncrypt(
    {
      key: publicKey,
      oaepHash: "sha256",
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(plainText, "base64")
  );
  return cipherText.toString();
}
// console.log({
//   plainText: "trinh12345",
//   cipherText: encrypt("trinh12345"),
// });
// decrypt
function decrypt(cipherText) {
  const plainText = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(cipherText, "base64")
  );
  return plainText.toString();
}
const cipherText = encrypt("trinh12345");
const decryptedText = decrypt(cipherText);
console.log({
  plainText: "trinh12345",
  cipherText: cipherText,
  decryptedText: decryptedText,
});




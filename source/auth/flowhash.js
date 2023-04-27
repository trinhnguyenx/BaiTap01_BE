const crypto = require("crypto");

function hashPassword(plainPassword) {
  //Generate random salt
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha1")
    .toString("hex");

  return {
    salt,
    hashedPassword,
  };
}
module.exports = { hashPassword };

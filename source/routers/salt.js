const crypto = require("crypto");
const plainPassword = "trinh12345";

function hashWithSalt(input) {
  //generate random salt
  const salt = crypto.randomBytes(16).toString("hex");
  //console.log(salt);

  //Hash with salt we've just generated
  const hashedPassword = crypto
    .pbkdf2Sync(input, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashedPassword;
}
const iterations = 10;
for (let i = 1; i < iterations; ++i) {
  hashWithSalt("");
}
for (let i = 1; i < 10; ++i) {
  const hashed = hashWithSalt(plainPassword);
  console.log({ plainPassword, hashed });
  // console.log("==============");
}

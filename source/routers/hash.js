const  crypto = require("crypto")

function hassPassword(input) {
    const hashObject = crypto.createHash("sha512");
    const hashedPassword = hashObject
    .update(input)
    .digest('hex');
    return hashedPassword;
}
const plainPassword = "trinh12345";
const hashedPassword = hassPassword(plainPassword);
console.log(hashedPassword);
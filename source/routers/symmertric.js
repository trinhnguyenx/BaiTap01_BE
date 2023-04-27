//SYMMERTRIC use one SECRET KEY
//  quy luật encrypt
// 1. Append Secret key vào cuối chuỗi
// 2. đảo ngược chuỗi

const SECRET = "SECRET";

function ReversedString(str) {
  let splitString = str.split("");
  splitString = splitString.reverse();
  return splitString.join("");
}
function encrypt(input) {
  const inputWithPadding = input + SECRET; //append
  const reversedString = ReversedString(inputWithPadding);
  return reversedString;
}

function decrypt(cipherText) {
  // Reverse String
  const reverseStr = ReversedString(cipherText);

  //Remove secret key in order to  get plain text
  const plainText = reverseStr.substring(0, reverseStr.length - SECRET.length);
  return plainText;
}                       

//encrypt
const plainText = "Trinh";
const cipherText = encrypt(plainText);

//console.log(plainText, cipherText);
const decryptedText = decrypt(cipherText);
console.log(cipherText, decryptedText);

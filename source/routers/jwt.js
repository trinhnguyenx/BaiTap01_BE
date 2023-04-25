const jsonwebtoken = require("jsonwebtoken");
const secret = "123456abc";

const user = {
  name: "a",
  username: "trinh123",
  password: " trinh1406",
  email: "nguyencongtrinhqb@gmail.com",
  age: 20,
  balance: "500000",
  gender: "male",
};
const jwtPayLoad = {
  name: user.name,
  usernaem: user.username,
  email: user.email,
  age: user.age,
  gender: user.gender,
};

// const jwt = jsonwebtoken.sign(jwtPayLoad, secret, {
//   algorithm: "HS256", //thuat toans hash o signature(  =H2S56(header+payload,SECRET))
//   expiresIn: "1d", //thời hạn
//   issuer: "sgroup", // người cấp phát JWT
// });
// console.log(jwt);
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYSIsInVzZXJuYWVtIjoidHJpbmgxMjMiLCJlbWFpbCI6Im5ndXllbmNvbmd0cmluaHFiQGdtYWlsLmNvbSIsImFnZSI6MjAsImdlbmRlciI6Im1hbGUiLCJpYXQiOjE2ODE4MjY2OTMsImV4cCI6MTY4MTkxMzA5MywiaXNzIjoic2dyb3VwIn0.4z35IPNK6_vRxqWKdWJrQXZ1HZKCzcqmt2vqsjEWsEA"
const isTokenValid = jsonwebtoken.verify(userToken,secret);
console.log("isTokenValid",isTokenValid);

const path = require("path");
const mysql2 = require("mysql2");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const Connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = Connection;
// console.log(process.env);

const mysql = require("mysql");
require("dotenv").config();

// Tạo một kết nối tới cơ sở dữ liệu MySQL
const Connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = Connection;

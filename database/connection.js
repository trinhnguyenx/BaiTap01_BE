const mysql = require("mysql");

// Tạo một kết nối tới cơ sở dữ liệu MySQL
const Connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Trinh123@",
  database: "users_databse",
})
module.exports = Connection

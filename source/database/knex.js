const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const knex = require("knex");

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
  },
});
module.exports = db;

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();

const db = require("../database/connection");
const { hashPassword } = require("../auth/flowhash");
app.get("/", (req, res) => {
  console.log("aloalo");
});
app.post("/register", async function (req, res) {
  //get data from request body
  const { username, password, name, age, email, gender } = req.body;

  db.query(`SELECT * FROM user WHERE username = ?`, username, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    const user = rows[0];

    if (user) {
      return res.status(400).json({
        message: "User already taken",
      });
    }
  });

  const { hashedPassword, salt } = hashPassword(password);
  db.query(
    "INSERT INTO user (username, name,salt , password,age,email,gender) VALUES (?,?,?,?,?,?,?)",
    [username, name, salt, hashedPassword, age, email, gender],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Internal sever error" });
      }
      return res.status(201).json({ message: "Register successfully" });
    }
  );
});

app.post("/login", async function (req, res) {
  const { usernamelg, passwordlg } = req.body;
  if (!usernamelg || !passwordlg) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  try {
    db.query(
      `SELECT * FROM user WHERE username = ?`,
      usernamelg,
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Internal sever error !" });
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "Invalid username or password!" });
        }
        const user = results[0];
        // Compare password hashes
        const hashedPasswordlg = crypto
          .pbkdf2Sync(passwordlg, user.salt, 1000, 64, "sha1")
          .toString("hex");
        if (hashedPasswordlg !== user.password) {
          // console.log(user.salt);
          // console.log(hashedPasswordlg);
          return res
            .status(401)
            .json({ message: "Invalid username or password!1" });
        }
        // Sign JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // Send response with token
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;

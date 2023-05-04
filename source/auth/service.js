const db = require("../database/connection");
const { hashPassword } = require("../auth/flowhash");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {
  static async registerUser(username, password, name, age, email, gender) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE username = ?`,
        username,
        (err, rows) => {
          if (err) {
            return reject(new Error("Internal server error"));
          }

          const user = rows[0];

          if (user) {
            return reject(new Error("User already taken"));
          }

          const { hashedPassword, salt } = hashPassword(password);

          db.query(
            "INSERT INTO user (username, name, salt, password, age, email, gender) VALUES (?,?,?,?,?,?,?)",
            [username, name, salt, hashedPassword, age, email, gender],
            (err, rows) => {
              if (err) {
                return reject(new Error("Internal sever error"));
              }
              return resolve("Register successfully");
            }
          );
        }
      );
    });
  }

  static async loginUser(usernamelg, passwordlg) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user WHERE username = ?`,
        usernamelg,
        async (err, results) => {
          if (err) {
            return reject(new Error("Internal sever error !"));
          }

          if (results.length === 0) {
            return reject(new Error("Invalid username or password!"));
          }

          const user = results[0];

          const hashedPasswordlg = crypto
            .pbkdf2Sync(passwordlg, user.salt, 1000, 64, "sha1")
            .toString("hex");

          if (hashedPasswordlg !== user.password) {
            return reject(new Error("Invalid username or password!"));
          }

          const token = jwt.sign({ id: user.ID_user }, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "24h",
          });

          return resolve(token);
        }
      );
    });
  }

  static async updateUser(userId, name, age, gender) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE user SET name = ?, gender = ?, age = ? where ID_user = ?`,
        [name, gender, age, userId],
        (err, results) => {
          if (err) {
            return reject(new Error("Internal sever error !"));
          }

          return resolve("User info updated successfully!");
        }
      );
    });
  }
}

module.exports = UserService;

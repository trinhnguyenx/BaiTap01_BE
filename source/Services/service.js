const db = require("../database/connection");
const { hashPassword } = require("../auth/flowhash");
const { mailService } = require("./mail.service");
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

          const token = jwt.sign({ id: user.ID_User }, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "24h",
          });
          return resolve(token);
        }
      );
    });
  }

  static async updateUser(userId, name, age, gender, email) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE user SET name = ?, gender = ?, age = ?, email = ? where ID_User = ?`,
        [name, gender, age, email, userId],
        (err, results) => {
          if (err) {
            return reject(new Error("Internal sever error !"));
          }

          return resolve("User info updated successfully!");
        }
      );
    });
  }
  static async forgotPassWord(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            return reject(new Error("Internal sever error !"));
          }
          user = results[0];
          if (user === undefined) {
            return reject(new Error("Email does not exist !"));
          } else {
            const pwdResetToken = crypto.randomBytes(16).toString("hex");
            const expireToken = new Date(Date.now() + 10 * 60 * 1000);
            console.log(pwdResetToken);
            console.log(expireToken);
            db.query(
              "update user set passwordResetToken = ?, passwordResetExpiration = ? where email = ?",
              [pwdResetToken, expireToken, email],
              async (err, result) => {
                try {
                  await mailService.sendEmail({
                    emailFrom: "nguyencongtrinhqb@gmail.com",
                    emailTo: "nguyencongtrinhltqb@gmail.com",
                    emailSubject: "Reset Email",
                    emailText: `${pwdResetToken}`,
                  });

                  return resolve("reset password email sent successfully");
                } catch (error) {
                  return reject(new Error("Error Send Mail!"));
                }
              }
            );
          }
        }
      );
    });
  }
  static async ResetPassword(PasswordResetToken, email, newPassword, time) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ? AND passwordResetToken = ? AND passwordResetExpiration >= ?",
        [email, PasswordResetToken, time],
        (error, results) => {
          if (error) {
            return reject(new Error("Fail!"));
          }
          const resultUser = results[0];
          if (resultUser === undefined) {
            return reject(new Error("Token expired!"));
          }
          const { salt, hashedPassword } = hashPassword(newPassword);
          db.query(
            "UPDATE user SET password = ?,salt = ?, passwordResetToken = null, passwordResetExpiration = null WHERE email = ?",
            [hashedPassword, salt, email],
            (req, results) => {
              return resolve("Reset successfully!");
            }
          );
        }
      );
    });
  }
}

module.exports = UserService;

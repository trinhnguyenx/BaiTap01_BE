const connnection = require("../database/connection");
const connection2 = require("../database/knex");
const { hashPassword } = require("../auth/flowhash");
const validate = require("../middleware/validate");
const knex = require("../database/knex");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});
authRouter.post("/vote/:idoption", (req, res) => {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);

  try {
    const isValidToken = jsonwebtoken.verify(authorizationHeader, publicKey);

    connnection.query(
      "insert into user_option(option_fk_id, user_fk_id) values(?, ?)",
      [req.params.idoption, isValidToken.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        return res.status(202).json({
          message: "added submit",
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

authRouter.delete("/vote/:idoption", (req, res) => {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);

  try {
    const isValidToken = jsonwebtoken.verify(authorizationHeader, publicKey);

    connnection.query(
      "delete from user_option where option_fk_id = ? and user_fk_id = ?",
      [req.params.idoption, isValidToken.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        return res.status(202).json({
          message: "delete vote submit",
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = authRouter;

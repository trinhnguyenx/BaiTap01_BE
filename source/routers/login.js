const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const dbs = [
  {
    username: "trinh",
    age: 22,
    email: "trinh@gmail.com",
    id: 1,
    password: "trinh12345",
    balance: 1000000,
  },
  {
    username: "trung",
    age: 24,
    email: "trung@gmail.com",
    id: 2,
    password: "trung12345",
    balance: 1000000000,
  },
];

const SECRET = "alo123";

app.use(express.json());

app.post("/login", function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  // Find user in db
  const user = dbs.find((u) => u.username === username);

  // Case 1: User does not exist
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  //privatekey encrypt instead of secret key
  // Case 2: Found user with that username
  if (user.password === password) {
    // Sign a jwt
    const jwt = jsonwebtoken.sign(
      {
        username: user.username,
        email: user.email,
        age: user.age,
      },
      privateKey,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    // Return jwt to user
    return res.status(200).json({
      data: jwt,
      message: "Login success",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

app.get("/balance", (req, res, next) => {
  // Get username from query string
  const username = req.query.username;
  // Get token from request
  const authorizationHeader = req.headers.authorization;
  // authorizationHeader = 'Bearer <TOKEN>'
  // => token: authorizationHeader.substring(7)
  const userToken = authorizationHeader.substring(7);

  // Verify token
  try {
    //public decrypt instead of secret key
    const isTokenValid = jsonwebtoken.verify(
      /*userToken*/ authorizationHeader,
      publicKey
    );
    console.log(JSON.stringify(isTokenValid.username));
    // Authorization success
    if (isTokenValid.username == username) {
      const user = dbs.find((u) => u.username === username);

      return res.status(200).json({
        balance: user.balance,
      });
    }

    // Authorization failed
    return res.status(401).json({
      message: "unauthorized",
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
});

app.listen(3000, () => console.log("Server is listening on PORT 3000"));

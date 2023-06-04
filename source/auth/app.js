const express = require("express");
const app = express();

const db = require("../database/connection");
const UserController = require("../Controller/controller");
app.get("/", (req, res) => {});

app.post("/register", UserController.registerUser);

app.post("/login", UserController.loginUser);

app.put("/user/:id", UserController.updateUser);

app.post("/forgot-password", UserController.forgotPassWord);

app.post("/reset-password", UserController.ResetPassWord);

module.exports = app;

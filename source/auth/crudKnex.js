const express = require("express");
const app = express();
const validate = require("../middleware/middlewareKnex");
const UserControllerKnex = require("../Controller/controllerKnex");
app.get("/user", UserControllerKnex.getUsers);

app.post("/register", validate, UserControllerKnex.registerUser);

app.post("/login", UserControllerKnex.loginUser);

app.put("/user/:id", UserControllerKnex.updateUser);

app.delete("userdel/:id", UserControllerKnex.deleteUser);

module.exports = app;

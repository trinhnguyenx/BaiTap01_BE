const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 4000;
const authRouter = require("../auth/app");

app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extends: false }));

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`sever is listening on port  ${port}`);
});

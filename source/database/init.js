const express = require("express");
const app = express();
const Connection = require("./connection");

function getUser(id, callback) {
  Connection.query(
    "select * from  where ID_Users = ?",
    [id],
    function (err, result) {
      if (err) {
        throw err;
      }
      return callback(result);
    }
  );
}

app.get("/user", (req, res) => {
  let sql = "SELECT * FROM users";
  Connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//
app.post("/user", (req, res) => {
  Connection.query(
    "insert into users (Name, Gender, Age) values (? , ? , ?) ",
    [req.body.Name, req.body.Gender, req.body.Age],
    (err, data) => {
      if (err) throw err;
      res.send(data);
    }
  );
});
//
app.get("/user/:id", (req, res) => {
  getUser(id, (result) => {
    info = result;
    if (info === null) {
      res.status(400);
      res.senđ("Người dùng không tồn tại");
    } else {
      res.send(info);
    }
  });
});
//
app.delete("/user/:id", (req, res) => {
  Connection.query(
    "Delete from users where ID_Users = ?",
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      else {
        res.send("Deleted");
      }
    }
  );
});
//
app.put("/user/:id", (req, res) => {
  get_info(id, (result) => {
    info = result;
    if (info === null) {
      res.status(400);
      res.send("Người dùng không tồn tại");
    } else {
      Connection.query(
        "update users set Name = ?, Gender = ?, Age = ? where ID_Users = ?",
        [req.body.Name, req.body.Gender, req.body.Age, req.params.id],
        function (err, result) {
          if (err) throw err;
          res.send("Updated");
        }
      );
    }
  });
});

// Lắng nghe và xử lý các kết nối đến port 3000
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

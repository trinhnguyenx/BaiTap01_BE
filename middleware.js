const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let data = [
  {
    id: 1,
    fullname: "Nguyễn Công Trình",
    gender: true,
    age: 18,
  },
  {
    id: 2,
    fullname: "Nguyen Văn A",
    gender: false,
    age: 15,
  },
];
function Validate(req, res, next) {
  const fullname = req.body.fullname;
  if (/\d+/.test(fullname)) {
    return res.status(400).json({ message: "Tên không hợp lệ" });
  }
  if (req.body.age < a) {
    return res.status(400).json({ message: "tuoi khong duoc be hơn 0" });
  }
}

//show all
app.use(bodyParser.json());
app.get("/user", (req, res) => {
  res.send(data);
});

//show theo id
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const result = data.find((item) => item.id === parseInt(id)); // first
  if (!result) {
    res.status(404).send("Record not found");
  } else {
    res.send(result);
  }
});

// update theo id
app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Record not found");
  } else {
    data[index].fullname = req.body.fullname || data[index].fullname;
    data[index].gender = req.body.gender || data[index].gender;
    data[index].age = req.body.age || data[index].age;
    res.send(data[index]);
  }
});
//create new data
app.post("/user", (req, res) => {
  const user = {
    id: data[data.length - 1].id + 1,
    fullname: req.body.fullname,
    gender: req.body.gender,
    age: req.body.age,
  };
  data.push(user);
  res.send(user);
});
//delete theo id
app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    // trả về -1 không có phần tử nào thỏa mãn
    res.status(404).send("Record not found");
  } else {
    data.splice(index, 1); // xóa 1 phần tử tại vị trí index
    res.send(data);
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

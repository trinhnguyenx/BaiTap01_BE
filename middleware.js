function validate(req, res, next) {
//   let checknumber = /^[^0-9]+$/;
//   let checkstr = /[^\w\s]/g;
     let  regex = /^[^\r\n0-9]+[1-9][0-9]*$/
  const fullname = req.body && req.body.fullname;
  const age = req.body && req.body.age;
  if (regex.test(fullname) && age >= 0) {
    next();
  } else {
    res.status(400).send({ message: "Invalid data" });
  }
}
module.exports = validate;

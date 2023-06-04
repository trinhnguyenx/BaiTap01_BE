function validate(req, res, next) {
  let regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  let regexUserName = /^[a-zA-Z0-9_-]{4,16}$/;
  let regetPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (regexUserName.test(username)) {
    next();
  } else if (regetPassword.test(password)) {
    next();
  } else if (regexEmail.test(email)) {
    next();
  } else {
    res.status(400).send({ message: "Invalid data" });
  }
}
module.exports = validate;

function validate(req, res, next) {
    const { fullname, age } = req.body;
    if (/^[^0-9]+$/.test(fullname) && age >= 0) {
      next();
    } else {
      res.status(400).send({ message: 'Invalid data' });
    }
  }
module.exports = validate;

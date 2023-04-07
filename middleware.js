function Validate(req, res, next) {
    const fullname = req.body.fullname;
    if (/\d+/.test(fullname)) {
      return res.status(400).json({ message: "Tên không hợp lệ" });
    }
    if (req.body.age < a) {
      return res.status(400).json({ message: "tuoi khong duoc be hơn 0" });
    }
    next()
  }
  module.exports = Validate
const UserService = require("./service");
const jwt = require("jsonwebtoken");

class UserController {
  static async registerUser(req, res) {
    const { username, password, name, age, email, gender } = req.body;

    try {
      const message = await UserService.registerUser(
        username,
        password,
        name,
        age,
        email,
        gender
      );
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async loginUser(req, res) {
    const { usernamelg, passwordlg } = req.body;

    try {
      const token = await UserService.loginUser(usernamelg, passwordlg);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    const userId = req.params.id;
    const { name, age, gender } = req.body;
    // Validate request
    if (!name && !age && !gender) {
      return res
        .status(400)
        .json({ message: "At least one field is required!" });
    }
    try {
      // Verify token
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id != userId) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const message = await UserService.updateUser(userId, name, age, gender);
      return res.status(200).json({ message: "update infor successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;

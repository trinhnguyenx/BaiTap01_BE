const UserServiceKnex = require("../Services/serviceKnex");
const jwt = require("jsonwebtoken");

class UserControllerKnex {
  //GET
  static async getUsers(req, res) {
    const { page, limit, search } = req.query;
    //http://localhost:5000/auth/user?page=1&limit=10&search=congtrinh
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    try {
      const { user, totalCount } = await UserServiceKnex.getUsers(
        pageNumber,
        limitNumber,
        search
      );
      return res.status(200).json({ user, totalCount });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  //REGISTER
  static async registerUser(req, res) {
    const { username, password, name, age, email, gender } = req.body;
    const createdAt = new Date(Date.now() + 10 * 60 * 1000);
    const createBy = req.user;

    try {
      const message = await UserServiceKnex.registerUser(
        username,
        password,
        name,
        age,
        email,
        gender,
        createdAt,
        createBy
      );
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async loginUser(req, res) {
    const { usernamelg, passwordlg } = req.body;

    try {
      const token = await UserServiceKnex.loginUser(usernamelg, passwordlg);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
  //UPDATE
  static async updateUser(req, res) {
    const userId = req.params.id;
    const { name, age, gender, email } = req.body;
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

      const message = await UserServiceKnex.updateUser(
        userId,
        name,
        age,
        gender,
        email
      );
      return res.status(200).json({ message: "update infor successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  //DELETE
  static async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const message = await UserServiceKnex.deleteUser(userId);
      return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete user." });
    }
  }
}

module.exports = UserControllerKnex;

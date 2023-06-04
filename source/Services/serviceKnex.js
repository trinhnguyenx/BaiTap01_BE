const db = require("../database/knex");
const { hashPassword } = require("../auth/flowhash");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserServiceKnex {
  //GET
  static async getUsers(page, limit, search) {
    try {
      const offset = (page - 1) * limit;
      const query = db("user")
        .select()
        .where((builder) => {
          if (search) {
            builder
              .where("name", "like", `%${search}%`)
              .orWhere("email", "like", `%${search}%`);
          }
        })
        .orderBy("id")
        .limit(limit)
        .offset(offset);
      const [user, [{ count: totalCount }]] = await Promise.all([
        query,
        db("user").count("*"),
      ]);

      return { user, totalCount };
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
  //REGISTER
  static async registerUser(
    username,
    password,
    name,
    age,
    email,
    gender,
    createdAt,
    createBy
  ) {
    try {
      const user = await db("user").where("username", username).first();

      if (user) {
        throw new Error("User already taken");
      }
      const { hashedPassword, salt } = hashPassword(password);
      await db("user").insert({
        username,
        name,
        salt,
        password: hashedPassword,
        age,
        email,
        gender,
        createdAt,
        createBy,
      });

      return "Register successfully";
    } catch (error) {
      throw new Error("Internal server error!");
    }
  }
  //LOGIN
  static async loginUser(username, password) {
    try {
      const user = await db("user").where("username", username).first();

      if (!user) {
        throw new Error("Invalid username or password");
      }

      const hashedPassword = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, "sha1")
        .toString("hex");

      if (hashedPassword !== user.password) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.sign({ id: user.ID_User }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "24h",
      });

      return token;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
  //UPDATE
  static async updateUser(userId, name, age, gender, email) {
    try {
      await db("user")
        .where("ID_User", userId)
        .update({ name, gender, age, email });

      return "User info updated successfully";
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
  //DELETE
  static async deleteUser(userId) {
    try {
      await db("user").where("ID_User", userId).del();
      return "User deleted successfully";
    } catch (error) {
      throw new Error("Failed to delete user.");
    }
  }
}

module.exports = UserServiceKnex;

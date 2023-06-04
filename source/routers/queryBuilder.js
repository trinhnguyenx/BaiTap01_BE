const db = require("../database/knex");

const getDBEqualqueryBuilder = async () => {
  try {
    const users = await db("user")
      .select("ID_User", "name", "age")
      .where("age", ">", 18)
      .orderBy("name", "asc");

    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    db.destroy();
  }
};
const insertUser = async (user) => {
  try {
    const insertedUser = await db("user").insert(user);

    console.log("User inserted:", insertedUser);
  } catch (error) {
    console.error(error);
  } finally {
    db.destroy();
  }
};

const user = { name: "John", age: 25 };
const updateUser = async (userId, newData) => {
  try {
    const updatedUser = await db("user")
      .where("ID_User", userId)
      .update(newData);

    console.log("User updated:", updatedUser);
  } catch (error) {
    console.error(error);
  } finally {
    db.destroy();
  }
};
const deleteUser = async (userId) => {
  try {
    const deletedUser = await db("user").where("ID_User", userId).del();

    console.log("User deleted:", deletedUser);
  } catch (error) {
    console.error(error);
  } finally {
    db.destroy();
  }
};

const userId = 5;
deleteUser(userId);

// const newData = { age: 30 };

// updateUser(userId, newData);

// insertUser(user);

// getDBEqualqueryBuilder();

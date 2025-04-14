const db = require("../../config/db");

const getAllUser = async () => {
  const { rows } = await db.query("SELECT * FROM users");
  return rows;
};

const createUser = async (name, email) => {
  const { rows } = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return rows[0];
};

module.exports = { getAllUser, createUser };

const db = require("../../config/db");
require("dotenv").config();

const createTableIfNotExists = async () => {
  // Vérifie si la table 'users' existe
  const checkTableQuery = `
    CREATE TABLE IF NOT EXISTS ${process.env.Table_users} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(checkTableQuery);
};

const getAllUser = async () => {
  await createTableIfNotExists(); // Assure-toi que la table existe avant d'interroger
  const { rows } = await db.query(`SELECT * FROM ${process.env.Table_users}`);
  return rows;
};

const createUser = async (name, email) => {
  await createTableIfNotExists(); // Assure-toi que la table existe avant de créer un utilisateur
  const { rows } = await db.query(
    `INSERT INTO ${process.env.Table_users} (name, email) VALUES ($1, $2) RETURNING *`,
    [name, email]
  );
  return rows[0];
};

module.exports = { getAllUser, createUser };

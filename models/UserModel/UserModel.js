const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const createTableIfNotExists = async () => {
  // Vérifie si la table 'users' existe et ajoute les champs role et company
  const checkTableQuery = `
    CREATE TABLE IF NOT EXISTS ${process.env.Table_users} (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(checkTableQuery);
};

const getAllUser = async () => {
  await createTableIfNotExists(); // S'assurer que la table existe avant d'interroger
  const { rows } = await db.query(`SELECT * FROM ${process.env.Table_users}`);
  return rows;
};

const createUser = async (name, email, password, uid, role) => {
  await createTableIfNotExists(); // Assure-toi que la table existe avant de créer un utilisateur
  const { rows } = await db.query(
    `INSERT INTO ${process.env.Table_users} (name, email, password, uid, role) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, uid, role]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  await createTableIfNotExists(); // S'assurer que la table existe avant de rechercher un utilisateur
  const { rows } = await db.query(
    `SELECT * FROM ${process.env.Table_users} WHERE email = $1`,
    [email]
  );
  return rows[0];
};

module.exports = { getAllUser, createUser, findUserByEmail };

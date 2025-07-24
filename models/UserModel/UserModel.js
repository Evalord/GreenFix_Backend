const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const createTableIfNotExists = async () => {
  // Vérifie si la table 'users' existe et ajoute les champs role et company
  const checkTableQuery = `
    CREATE TABLE IF NOT EXISTS ${process.env.Table_users} (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(50) UNIQUE NOT NULL, -- Ajout de l'UID
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      company VARCHAR(100),
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

const createUser = async (name, email, password, role, company) => {
  await createTableIfNotExists();
  const uid = uuidv4(); // Génère un UID unique
  const { rows } = await db.query(
    `INSERT INTO ${process.env.Table_users} (uid, name, email, password, role, company) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [uid, name, email, password, role, company]
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

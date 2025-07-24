const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/UserModel/UserModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; // À placer dans un .env en production

// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs :",
      error.message
    );
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter un nouvel utilisateur
const addUser = async (req, res) => {
  let { name, email, password, role, company } = req.body; // Ajout de role et company

  email = email?.toLowerCase(); // Force l'email en minuscule

  try {
    const existing = await userModel.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // Hacher le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await userModel.createUser(
      name,
      email,
      hashedPassword,
      role,
      company
    );
    return res.status(201).json({ data: user, message: "Utilisateur créé" });
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur :", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  let { email, password } = req.body;

  email = email?.toLowerCase(); // Force l'email en minuscule

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifie si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // Ajout du rôle
        company: user.company, // Ajout de la société
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { getUsers, addUser, loginUser };

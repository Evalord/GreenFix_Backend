const userModel = require("../../models/UserModel/UserModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = userModel.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, addUser };

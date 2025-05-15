const express = require("express");
const {
  addUser,
  loginUser,
  getUsers,
} = require("../controllers/users/UserController");
const router = express.Router();

router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/user", getUsers);

module.exports = router;

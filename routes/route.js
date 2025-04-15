const express = require("express");
const router = express.Router();
const user = require("../controllers/users/UserController");

router.post("/register", user.addUser);
router.post("/login", user.loginUser);
router.get("/user", user.getUsers);

module.exports = router;

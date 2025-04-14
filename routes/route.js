const express = require("express");
const router = express.Router();
const user = require("../controllers/users/UserController");

router.get("/user/alluser", user.getUsers);
router.post("/user/newUser", user.addUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js")
const verifyJWT = require("../middlewares/auth.js")
const admin = require("../middlewares/admin.js")


router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);

module.exports = router;
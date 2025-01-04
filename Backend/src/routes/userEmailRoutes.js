const express = require("express");
const userEmailController = require("../controllers/userEmailController.js");
const router = express.Router();


router.post("/userEmail",userEmailController.userEmail);
router.get("/getUserEmail",userEmailController.getUserEmail);

module.exports = router;
const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signUp", authController.registerUser);
router.post("/signIn", authController.loginUser);
router.post("/logout", authController.logout);


module.exports = router;

const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/sign-in", authController.getSignInPage);

router.get("/sign-up", authController.getSignUpPage);

module.exports = router;

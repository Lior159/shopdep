const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/sign-in", authController.getSignInPage);

router.post("/sign-in", authController.postSignInPage);

router.get("/sign-up", authController.getSignUpPage);

router.post("/sign-up", authController.postSignUpPage);

module.exports = router;

const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/sign-in", authController.getSignInPage);

router.post("/sign-in", authController.postSignInPage);

router.get("/sign-up", authController.getSignUpPage);

router.post("/sign-up", authController.postSignUpPage);

router.get("/logout", authController.isAuthenticated, authController.getLogOut);

router.get("/reset-password", authController.getResetPasswordPage);

router.post("/reset-password", authController.postResetPasswordPage);

router.get(
  "/update-password/:resetToken",
  authController.getUpdatePasswordPage
);

router.post("/update-password", authController.postUpdatePasswordPage);

module.exports = router;

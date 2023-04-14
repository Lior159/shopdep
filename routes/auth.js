const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator");

const router = express.Router();

router.get("/sign-in", authController.getSignInPage);

router.post("/sign-in", authController.postSignInPage);

router.get("/sign-up", authController.getSignUpPage);

router.post(
  "/sign-up",
  [
    body(
      ["email", "password", "confirmedPassword", "fname", "lname"],
      "Fields can't be empty"
    )
      .not()
      .isEmpty(),
    body("email", "Invalid email").isEmail(),
    body(
      "password",
      "Password must include at least 8 characters, english letters, numbers and speciel characters."
    )
      .isAscii()
      .isLength({ min: 8 }),
    body("confirmedPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be matched");
      }
      return true;
    }),
  ],
  authController.postSignUpPage
);

router.get("/logout", authController.isAuthenticated, authController.getLogOut);

router.get("/reset-password", authController.getResetPasswordPage);

router.post("/reset-password", authController.postResetPasswordPage);

router.get(
  "/update-password/:resetToken",
  authController.getUpdatePasswordPage
);

router.post("/update-password", authController.postUpdatePasswordPage);

module.exports = router;

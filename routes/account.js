const express = require("express");
const accountController = require("../controllers/account");
const authController = require("../controllers/auth");
const { check } = require("express-validator");

const router = express.Router();

router.get(
  "/",
  authController.isAuthenticated,
  accountController.getAccountPage
);

router.get(
  "/add-product",
  authController.isAdmin,
  accountController.getAddProductPage
);

router.post(
  "/add-product",
  authController.isAdmin,
  [
    check(["title", "price", "description"], "fields can't be empty")
      .not()
      .isEmpty(),
    check("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("You must upload an image");
      }
      return true;
    }),
  ],
  accountController.postAddProductPage
);

router.get(
  "/perosnal-info",
  authController.isAuthenticated,
  accountController.getPersonalInfoPage
);

module.exports = router;

const express = require("express");
const accountController = require("../controllers/account");
const authController = require("../controllers/auth");

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
  accountController.postAddProductPage
);

module.exports = router;

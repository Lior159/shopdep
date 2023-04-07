const express = require("express");
const shopController = require("../controllers/shop");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", shopController.getIndexPage);

router.get("/shop", shopController.getShopPage);

router.get(
  "/account",
  authController.isAuthenticated,
  shopController.getAccountPage
);

module.exports = router;

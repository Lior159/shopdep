const express = require("express");
const shopController = require("../controllers/shop");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", shopController.getIndexPage);

router.get("/shop", shopController.getShopPage);

router.post(
  "/add-to-cart/:productId",
  authController.isAuthenticated,
  shopController.postAddToCart
);

module.exports = router;

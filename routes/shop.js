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

router.get("/cart", authController.isAuthenticated, shopController.getCartPage);

module.exports = router;

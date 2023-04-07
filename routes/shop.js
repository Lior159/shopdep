const express = require("express");
const shopController = require("../controllers/shop");
const authController = require("../controllers/auth");
const accountContreoller = require("../controllers/account");

const router = express.Router();

router.get("/", shopController.getIndexPage);

router.get("/shop", shopController.getShopPage);

module.exports = router;

const Product = require("../models/product");

exports.getIndexPage = (req, res) => {
  res.render("shop/index", {
    path: "/",
    pageTitle: "Home",
  });
};

exports.getShopPage = (req, res) => {
  Product.find().then((products) => {
    res.render("shop/shop", {
      path: "/shop",
      pageTitle: "Shop",
      products,
    });
  });
};

exports.getProductPage = (req, res) => {};

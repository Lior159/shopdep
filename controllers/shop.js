const Product = require("../models/product");

exports.getIndexPage = (req, res) => {
  res.render("shop/index", {
    path: "/",
  });
};

exports.getShopPage = (req, res) => {
  Product.find()
  .then((products) => {
    res.render("shop/shop", {
      path: "/shop",
      products,
    });
  });
};

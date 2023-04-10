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

exports.postAddToCart = (req, res) => {
  const productId = req.params.productId;
  Product.findOne({ _id: productId })
    .then((product) => {
      console.log(product);
    })
    .catch();
};

exports.getProductPage = (req, res) => {};

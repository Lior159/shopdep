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
      return req.session.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/shop");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductPage = (req, res) => {};

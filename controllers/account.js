const Product = require("../models/product");

exports.getAccountPage = (req, res) => {
  res.render("account/account", {
    pageTitle: "Account",
    path: "/account",
  });
};

exports.getAddProductPage = (req, res) => {
  res.render("account/add-product", {
    pageTitle: "Add Product",
    path: "/account/add-product",
  });
};

exports.postAddProductPage = (req, res) => {
  const { title, price, imgUrl, description } = req.body;
  const product = new Product({
    title,
    price,
    imgUrl,
    description,
  });
  product.save().then((result) => {
    res.redirect("/account/add-product");
  });
};

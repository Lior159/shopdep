const { validationResult } = require("express-validator");
const { flashAndRender } = require("../utils/util-funcs");
const Product = require("../models/product");

exports.getAccountPage = (req, res) => {
  res.render("account/account", {
    path: "/account",
    pageTitle: "Account",
  });
};

exports.getAddProductPage = (req, res) => {
  res.render("account/add-product", {
    path: "/account/add-product",
    pageTitle: "Add product",
  });
};

exports.postAddProductPage = (req, res) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return flashAndRender(req, res, errors[0].msg, "/account/add-product");
  }

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    imgUrl: req.file.image.path,
    description: req.body.description,
  });
  product.save().then((result) => {
    console.log("Product created");
    res.redirect("/account/add-product");
  });
};

exports.getPersonalInfoPage = (req, res) => {
  res.render("account/personal-info", {
    path: "/account/personal-info",
    pageTitle: "Personal information",
    user: req.session.user,
  });
};

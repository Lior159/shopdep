const Product = require("../models/product");
const User = require("../models/user");

exports.getIndexPage = (req, res) => {
  res.render("shop/index", {
    path: "/",
    pageTitle: "Home",
  });
};

exports.getShopPage = (req, res) => {
  const PRODUCTS_PER_PAGE = 3;
  let totalPages;
  let currentPage = +req.query.page || 1;
  Product.countDocuments()
    .then((count) => {
      totalPages = Math.ceil(count / PRODUCTS_PER_PAGE);
      return Product.find()
        .skip(PRODUCTS_PER_PAGE * (currentPage - 1))
        .limit(PRODUCTS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/shop", {
        path: "/shop",
        pageTitle: "Shop",
        products,
        currentPage,
        previousPage: currentPage - 1 > 0 ? currentPage - 1 : currentPage,
        nextPage: currentPage + 1 <= totalPages ? currentPage + 1 : currentPage,
        firstIndex: currentPage < 4 ? 1 : currentPage - 2,
        totalPages,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  Product.find().then((products) => {});
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

exports.getCartPage = (req, res) => {
  res.render("/shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
    cart: req.session.user.cart.items,
  });
};

exports.getProductPage = (req, res) => {};

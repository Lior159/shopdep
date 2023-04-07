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

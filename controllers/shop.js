exports.getIndexPage = (req, res) => {
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/",
  });
};

exports.getShopPage = (req, res) => {
  res.render("shop/shop", {
    pageTitle: "Shop",
    path: "/shop",
  });
};

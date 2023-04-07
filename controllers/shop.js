exports.getIndexPage = (req, res) => {
  res.render("shop/index", {
    path: "/",
  });
};

exports.getShopPage = (req, res) => {
  res.render("shop/shop", {
    path: "/shop",
  });
};

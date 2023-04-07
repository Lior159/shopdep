exports.getAccountPage = (req, res) => {
  res.render("shop/account", {
    pageTitle: "Account",
    path: "/account",
    admin: req.session.user.isAdmin,
  });
};

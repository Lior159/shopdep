exports.getSignInPage = (req, res) => {
  res.render("auth/sign-in", {
    pageTitle: "Sign In",
    path: "/sign-in",
  });
};

exports.getSignUpPage = (req, res) => {};

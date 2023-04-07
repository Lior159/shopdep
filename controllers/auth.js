const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getSignInPage = (req, res) => {
  res.render("auth/sign-in", {
    pageTitle: "Sign In",
    path: "/sign-in",
  });
};

exports.getSignUpPage = (req, res) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign Up",
    path: "/sign-up",
  });
};

exports.postSignUpPage = (req, res) => {
  const { fname: firstName, lname: lastName, email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
    }
  });
};

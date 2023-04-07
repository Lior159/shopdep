const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("error", "you must sign in");
    return req.session.save(() => {
      res.redirect("/sign-in");
    });
  }
  next();
};

exports.isAdmin = (req, res) => {
  if (!req.session.user.isAdmin) {
    req.flash("error", "you must be admin");
    return req.session.save(() => {
      res.redirect("/sign-in");
    });
  }
  next();
};

exports.getSignInPage = (req, res) => {
  res.render("auth/sign-in", {
    pageTitle: "Sign In",
    path: "/sign-in",
    errorMessage: req.flash("error")[0],
  });
};

exports.postSignInPage = (req, res) => {
  const { email, password } = req.body;
  let user;

  User.findOne({ email })
    .then((u) => {
      if (!u) {
        throw new Error("email not exist");
      }
      user = u;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        throw new Error("wrong password");
      }

      req.session.user = true;
      req.session.isLoggedIn = true;
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      req.flash("error", err.message);
      req.session.save(() => {
        res.redirect("/sign-in");
      });
    });
};

exports.getSignUpPage = (req, res) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign Up",
    path: "/sign-up",
    errorMessage: req.flash("error")[0],
  });
};

exports.postSignUpPage = (req, res) => {
  const { fname: firstName, lname: lastName, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("Email already exists for other user.");
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: false,
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/sign-in");
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", err.message);
      req.session.save(() => {
        res.redirect("/sign-up");
      });
    });
};

exports.getLogOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

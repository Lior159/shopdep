const bcrypt = require("bcrypt");
const User = require("../models/user");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { flashAndRender } = require("../utils/util-funcs");

const transporter = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ff1f9352efe8f0",
    pass: "ce52f8eeec6529",
  },
});

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return flashAndRender(req, res, "You must sign in.", "/sign-in");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.session.user?.isAdmin) {
    return flashAndRender(req, res, "You must be admin.", "/sign-in");
  }
  next();
};

exports.getSignInPage = (req, res) => {
  res.render("auth/sign-in", {
    path: "/sign-in",
    pageTitle: "Sign in",
  });
};

exports.postSignInPage = (req, res) => {
  const { email, password } = req.body;
  let user;

  User.findOne({ email })
    .then((u) => {
      if (!u) {
        throw new Error("Email not exist");
      }
      user = u;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        throw new Error("Wrong password");
      }

      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      flashAndRender(req, res, err.message, "/sign-in");
    });
};

exports.getSignUpPage = (req, res) => {
  res.render("auth/sign-up", {
    path: "/sign-up",
    pageTitle: "Sign up",
  });
};

exports.postSignUpPage = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) {
    return flashAndRender(req, res, errors[0].msg, "/sign-up");
  }

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
      flashAndRender(req, res, err.message, "/sign-up");
    });
};

exports.getLogOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getResetPasswordPage = (req, res) => {
  res.render("auth/reset-password", {
    pageTitle: "Reset password",
    path: "/reset-password",
  });
};

exports.postResetPasswordPage = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset-password");
    }

    const resetToken = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          throw new Error("Email not found");
        }

        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 600_000;

        return user.save();
      })
      .then(() => {
        res.redirect("/");
        return transporter.sendMail({
          from: "templiorz@gmail.com",
          to: req.body.email,
          subject: "Password reset",
          html: `<p>You've requested a password reset</p>
          <p>click this <a href="http://localhost:3000/update-password/${resetToken}">link</a> to set a new password</p>`,
        });
      })
      .catch((err) => {
        flashAndRender(req, res, err.message, "/reset-password");
      });
  });
};

exports.getUpdatePasswordPage = (req, res) => {
  User.findOne({
    resetToken: req.params.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        throw new Error("Invalid or expired link");
      }
      res.render("auth/update-password", {
        pageTitle: "Upadte password",
        path: "/update-password",
        resetToken: req.params.resetToken,
      });
    })
    .catch((err) => {
      flashAndRender(req, res, err.message, "/reset-password");
    });
};

exports.postUpdatePasswordPage = (req, res) => {
  let user;
  User.findOne({
    resetToken: req.body.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((u) => {
      if (!u) {
        throw new Error("Invalid or expired link");
      }

      user = u;

      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      return user.save();
    })
    .then(() => {
      res.redirect("/sign-in");
    })
    .catch((err) => {
      flashAndRender(req, res, err.message, "/reset-password");
    });
};

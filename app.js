const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const csurf = require("csurf");

const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account.js");
const User = require("./models/user");

const app = express();

const MONGODB_URI =
  "mongodb+srv://lior:lior159@cluster1.wgsdzck.mongodb.net/shop?retryWrites=true&w=majority";

//setting up session storage
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//settin up ejs
app.set("view engine", "ejs");
app.set("views", "views");

//setting up public folder
app.use(express.static(path.join(__dirname, "public")));

//setting up session
app.use(
  session({
    secret: "liorzalta24@gmail.com",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

//setting up csrf protaction
app.use(csurf());

//setting up flash sessions
app.use(flash());

//setting up local variables
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  if (req.session.isLoggedIn) {
    req.session.user = new User().init(req.session.user);
    res.locals.isAdmin = req.session.user.isAdmin;
  }
  next();
});

//setting up routers
app.use(shopRouter);
app.use(authRouter);
app.use("/account", accountRouter);
app.use((req, res) => {
  res.render("404", {
    path: "/404",
    pageTitle: "Page not found",
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("connected");
  })
  .catch((err) => console.log(err));

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const csurf = require("csurf");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replaceAll(":", "-") + "-" + file.originalname
      );
    },
  }),
});

const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account.js");
const User = require("./models/user");

const app = express();

const MONGODB_URI = process.env.CONNECTION_STRING;
// const MONGODB_URI =
//   "mongodb+srv://lior:lior159@cluster1.wgsdzck.mongodb.net/shop?retryWrites=true&w=majority";

//setting up session storage
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//setting up file-parser
app.use(upload.single("image"));
//setting up body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//settin up ejs
app.set("view engine", "ejs");
app.set("views", "views");

//setting up public folder for css and js
app.use(express.static(path.join(__dirname, "public")));

//setting up public folder for product images
app.use("/images", express.static(path.join(__dirname, "images")));

//setting up session
app.use(
  session({
    secret: "liorzalta24@gmail.com",
    resave: false,
    saveUninitialized: false,
    store,
    // cookie: {
    //   maxAge: 1000 * 60 * 10,
    // },
  })
);

//setting up csrf protaction
app.use(csurf());

//setting up flash sessions
app.use(flash());

//setting up local variables
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("error")[0];
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isAdmin = req.session.user?.isAdmin;
  if (req.session.isLoggedIn) {
    req.session.user = new User().init(req.session.user);
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
    app.listen(process.env.PORT || 9090);
    console.log("connected");
  })
  .catch((err) => console.log(err));

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
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://lior:lior159@cluster1.wgsdzck.mongodb.net/shop?retryWrites=true&w=majority";

//setting up session storage
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const app = express();

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//settin up ejs
app.set("view engine", "ejs");
app.set("views", "views");

//setting up public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "liorzalta24@gmail.com",
    resave: false,
    saveUninitialized: false,
    store,
    // cookie: {
    //   maxAge: 1000*60*60;
    // }
  })
);

app.use(csurf());

app.use(flash());

//setting up local variables
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  if (req.session.isLoggedIn) {
    req.session.user = new User().init(req.session.user);
  }
  next();
});

//setting up routers
app.use(shopRouter);
app.use(authRouter);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("connected");
  })
  .catch((err) => console.log(err));

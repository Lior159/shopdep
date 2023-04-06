const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//settin up ejs
app.set("view engine", "ejs");
app.set("views", "views");

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setting up public folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);

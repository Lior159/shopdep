const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imgUrl: String,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);

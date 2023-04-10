const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cart = this.cart.items;

  const productIndex = cart.findIndex(
    (item) => product._id.toString() === item._id.toString()
  );

  if (productIndex < 0) {
    cart.push(product);
    cart.at(-1).quantity = 1;
  } else {
    cart[productIndex].quantity += 1;
  }

  return this.save();
};

module.exports = mongoose.model("User", userSchema);

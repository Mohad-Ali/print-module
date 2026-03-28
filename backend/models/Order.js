const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fileName: String,
  pageCount: Number,
  printType: String,
  copies: Number,
  totalPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
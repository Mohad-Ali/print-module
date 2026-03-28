const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Save Order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order saved", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
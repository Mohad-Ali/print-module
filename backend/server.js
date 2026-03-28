require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const orderRoutes = require("./routes/orders");
const uploadRoute = require("./routes/upload");

app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

// Serve Frontend (React build)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all for React Router (works with Express + Vite build)
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
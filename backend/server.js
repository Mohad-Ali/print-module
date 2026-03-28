require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Debug: check if env is loaded
// console.log("ENV VALUE:", process.env.MONGO_URI);


const orderRoutes = require("./routes/orders");
const uploadRoute = require("./routes/upload");

app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));


const __dirnamePath = path.resolve(); 
app.use(express.static(path.join(__dirnamePath, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnamePath, "../frontend/dist/index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
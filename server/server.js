const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Docker + Env Ready)
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mern-demo";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Mongo Error:", err));

// Routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/studentRoutes"));

// Test Route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Docker + Env Ready)
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mern-demo";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// Routes (better structured)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Optional: Global Error Handler (helps debugging)
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
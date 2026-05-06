const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mern-demo";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// ✅ All Routes (ONLY ONCE EACH)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enroll", require("./routes/enrollRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
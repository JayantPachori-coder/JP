const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB (FIXED)
mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/studentRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
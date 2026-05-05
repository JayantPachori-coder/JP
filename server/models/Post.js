const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// ✅ IMPORTANT FIX (prevents overwrite error)
module.exports =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
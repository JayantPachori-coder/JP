const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String
});

// ✅ FIXED: safe model export
module.exports =
  mongoose.models.User || mongoose.model("User", UserSchema);
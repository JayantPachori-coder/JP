const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: []
    }
  ]
});

// prevent model overwrite error
module.exports =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
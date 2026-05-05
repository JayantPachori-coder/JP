const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: []
    }
  ]
});

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
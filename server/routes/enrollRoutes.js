const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Course = require("../models/Course");

router.post("/", async (req, res) => {
  const { studentId, courseId } = req.body;

  await Student.findByIdAndUpdate(studentId, {
    $addToSet: { courses: courseId }
  });

  await Course.findByIdAndUpdate(courseId, {
    $addToSet: { students: studentId }
  });

  const updatedStudent = await Student.findById(studentId).populate("courses");

  res.json({
    message: "Enrolled successfully",
    student: updatedStudent
  });
});

module.exports = router;
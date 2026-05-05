const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Course = require("../models/Course");


// ---------------- CREATE STUDENT ----------------
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------- CREATE COURSE ----------------
router.post("/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------- ENROLL STUDENT ----------------
router.post("/enroll", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    console.log("ENROLL REQUEST:", req.body);

    if (!studentId || !courseId) {
      return res.status(400).json({ message: "Missing IDs" });
    }

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found" });
    }

    // update both sides
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

  } catch (err) {
    console.log("ENROLL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ---------------- GET STUDENTS ----------------
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().populate("courses");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------- GET COURSES ----------------
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("students");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Course = require("../models/Course");


// ---------------- CREATE STUDENT ----------------
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------- GET STUDENTS ----------------
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("courses");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
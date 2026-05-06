const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// CREATE COURSE
router.post("/", async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

// GET COURSES
router.get("/", async (req, res) => {
  const courses = await Course.find().populate("students");
  res.json(courses);
});

module.exports = router;
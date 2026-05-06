import React, { useState, useEffect } from "react";
import API from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  // 🔄 Load data
  const load = async () => {
    try {
      const c = await API.get("/courses");
      const s = await API.get("/students");

      setCourses(c.data);
      setStudents(s.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ➕ Add course
  const addCourse = async () => {
    if (!title) return;

    await API.post("/courses", { title });

    setTitle("");
    load();
  };

  // 🎓 Enroll student
  const enroll = async () => {
    if (!studentId || !courseId) return;

    await API.post("/enroll", {
      studentId,
      courseId
    });

    setStudentId("");
    setCourseId("");

    load();
  };

  return (
    <div>
      <h2>Courses + Enrollment (Many-to-Many)</h2>

      {/* ADD COURSE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course name"
      />
      <button onClick={addCourse}>Add Course</button>

      <hr />

      {/* ENROLL SECTION */}
      <h3>Enroll Student</h3>

      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      <button onClick={enroll}>Enroll</button>

      {/* SHOW DATA */}
      <hr />

      <h3>Students</h3>
      {students.map(s => (
        <div key={s._id}>
          <b>{s.name}</b>
          <div>
            Courses: {s.courses?.map(c => c.title).join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
}
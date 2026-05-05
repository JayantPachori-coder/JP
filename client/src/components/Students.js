import React, { useState, useEffect } from "react";
import API from "../api";
import "./styles.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  // 🔄 Load all data
  const load = async () => {
    try {
      const s = await API.get("/students");
      const c = await API.get("/courses");

      setStudents(s.data);
      setCourses(c.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ➕ Add student
  const addStudent = async () => {
    if (!name.trim()) return;

    await API.post("/students", { name });
    setName("");
    load();
  };

  // 🎓 Enroll student
  const enroll = async () => {
    if (!studentId || !courseId) {
      alert("Select both student and course");
      return;
    }

    console.log("ENROLL:", studentId, courseId);

    await API.post("/enroll", {
      studentId,
      courseId
    });

    setStudentId("");
    setCourseId("");

    load();
  };

  return (
    <div className="container">
      <h2>Students + Courses (Many ↔ Many)</h2>

      {/* ADD STUDENT */}
      <div className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student name"
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* ENROLL SECTION */}
      <div className="form">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
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
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <button onClick={enroll}>Enroll</button>
      </div>

      {/* DISPLAY STUDENTS */}
      <div className="list">
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((s) => (
            <div key={s._id} className="card">
              <h3>{s.name}</h3>

              <p>
                Courses:{" "}
                {s.courses?.length > 0
                  ? s.courses.map((c) => c.title).join(", ")
                  : "No courses"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
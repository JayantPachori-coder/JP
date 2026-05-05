import React from "react";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Students from "./components/Students";
import Courses from "./components/Courses";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>MERN Demo (Client)</h1>

      <Users />
      <Posts />
      <Students />
      <Courses />
    </div>
  );
}

export default App;
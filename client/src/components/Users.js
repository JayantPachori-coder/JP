import React, { useState, useEffect } from "react";
import API from "../api";
import "./styles.css";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await API.get("/users");
    setUsers(res.data.users);
  };

  useEffect(() => { load(); }, []);

  const addUser = async () => {
    if (!name) return;
    await API.post("/users", { name });
    setName("");
    load();
  };

  return (
    <div>
      <h2>Users (One → Many)</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add</button>

      {users.map(u => (
        <div key={u._id}>{u.name}</div>
      ))}
    </div>
  );
}
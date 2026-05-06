import React, { useState, useEffect } from "react";
import API from "../api";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");

  // ✅ Load users + posts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/users");
    setUsers(res.data.users);
    setPosts(res.data.posts);
  };

  // ➕ Add post
  const addPost = async () => {
    if (!title || !userId) return;

    await API.post("/users/posts", {
  title,
  user: userId
});

    setTitle("");
    setUserId("");

    // 🔄 refresh data after insert
    fetchData();
  };

  return (
    <div>
      <h2>User Post Here</h2>

      {/* CREATE POST */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <button onClick={addPost}>Add Post</button>

      {/* SHOW POSTS */}
      <h3>All Posts</h3>
      {posts.map((p) => (
        <div key={p._id} style={{ margin: "10px 0" }}>
          <b>{p.title}</b>
          <div>
            User: {p.user?.name || "Unknown"}
          </div>
        </div>
      ))}
    </div>
  );
}
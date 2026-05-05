const express = require("express");
const router = express.Router();

const User = require("../models/user");   // ✅ FIXED (capital U)
const Post = require("../models/Post");

// CREATE USER
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE POST
router.post("/posts", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS + POSTS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const posts = await Post.find().populate("user");

    res.json({ users, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
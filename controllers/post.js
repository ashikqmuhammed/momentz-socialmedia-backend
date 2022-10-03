const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body).save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
};

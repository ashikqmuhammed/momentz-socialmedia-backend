const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const newPost =await Post.create(req.body)
    const newPostPopullated = await Post.findById(newPost._id).populate(
      "user",
      "first_name last_name picture username gender"
    );
    console.log(newPostPopullated);
    res.json(newPostPopullated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFollowingPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followers = [...user.followers, req.user.id];
    const posts = await Post.find({ user: { $in: followers } })
      .populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const like = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    if (post.likes.includes(req.user.id)) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: req.user.id },
      });
      return res.json({ status: "ok" });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: req.user.id },
      });
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const galleryPosts = async (req, res) => {
  try {
    const galleryPosts = await Post.find();
    res.json(galleryPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const comment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: { comment, commentBy: req.user.id } },
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const post = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate(
      "user",
      "first_name last_name picture"
    );
    console.log(post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  like,
  galleryPosts,
  comment,
  post,
  getFollowingPosts,
};

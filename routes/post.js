const express = require("express");
const {
  createPost,
  getAllPosts,
  like,
  galleryPosts,
  comment,
  post,
  getFollowingPosts,
} = require("../controllers/post");

const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-post", authUser, createPost);
router.get("/get-all-posts", authUser, getAllPosts);
router.get("/get-following-posts", authUser, getFollowingPosts);
router.put("/like", authUser, like);
router.get("/gallery-posts", authUser, galleryPosts);
router.patch("/comment", authUser, comment);
router.get("/post/:postId", authUser, post);

module.exports = router;

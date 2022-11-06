const express = require("express");
const {
  createPost,
  getAllPosts,
  like,
  galleryPosts,
  comment,
  post,
} = require("../controllers/post");

const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-post", authUser, createPost);
router.get("/get-all-posts", authUser, getAllPosts);
router.put("/like", authUser, like);
router.get("/gallery-posts", authUser, galleryPosts);
router.patch("/comment", authUser, comment);
router.get("/post/:postId", authUser, post);

module.exports = router;

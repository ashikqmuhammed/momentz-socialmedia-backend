const express = require("express");
const { createPost, getAllPosts } = require("../controllers/post");
const { follow, unfollow } = require("../controllers/user");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-post", authUser, createPost);
router.get("/get-all-posts", authUser, getAllPosts);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);

module.exports = router;

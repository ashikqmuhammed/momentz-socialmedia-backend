const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  search,
  getRelationsPageInfos,
  updateProfilePicture,
  follow,
  unfollow,
  followers,
  following,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/profile/:username/:posttype", authUser, getProfile);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.get("/followers", authUser, followers);
router.get("/following", authUser, following);

router.post("/search/:searchTerm", authUser, search);
router.get("/get-relations-infos", authUser, getRelationsPageInfos);
router.put("/update-profile-picture", authUser, updateProfilePicture);

module.exports = router;

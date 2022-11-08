const express = require("express");
const cors = require("cors");
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
router.head("/login", cors(), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});
router.post("/activate", activateAccount);
router.post("/login",cors(), login);
router.get("/profile/:username/:posttype", authUser, getProfile);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.get("/followers", authUser, followers);
router.get("/following", authUser, following);

router.post("/search/:searchTerm", authUser, search);
router.get("/get-relations-infos", authUser, getRelationsPageInfos);
router.put("/update-profile-picture", authUser, updateProfilePicture);

module.exports = router;

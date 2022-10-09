const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  search,
  getRelationsPageInfos,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/profile/:username", authUser, getProfile);
router.post("/search/:searchTerm", authUser, search);
router.get("/get-relations-infos", authUser, getRelationsPageInfos);

module.exports = router;

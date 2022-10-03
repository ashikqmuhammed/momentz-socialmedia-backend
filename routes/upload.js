const express = require("express");
const { uploadImages } = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");
const imageValidation = require("../middlewares/imageValidation");

const router = express.Router();

router.post("/upload-images", authUser, imageValidation, uploadImages);

module.exports = router;

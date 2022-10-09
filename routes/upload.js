const express = require("express");
const { uploadImages, listImages } = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");
const imageValidation = require("../middlewares/imageValidation");

const router = express.Router();

router.post("/upload-images", authUser, imageValidation, uploadImages);
router.post("/list-images", authUser, listImages);

module.exports = router;

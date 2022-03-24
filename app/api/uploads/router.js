const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { uploadImage } = require("./controller");
const upload = require("../../middlewares/multer");

router.post("/uploads", auth, upload.single("image"), uploadImage);

module.exports = router;

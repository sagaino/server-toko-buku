const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

router.get("/categories", auth, function (req, res, next) {
  res.status(200).json({ message: "router categories" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/categories", function (req, res, next) {
  res.status(200).json({ message: "router categories" });
});

module.exports = router;

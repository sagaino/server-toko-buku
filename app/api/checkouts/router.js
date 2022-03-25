const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { checkout } = require("./controller");

router.post("/checkouts", auth, checkout);
module.exports = router;

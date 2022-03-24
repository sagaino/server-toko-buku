const express = require("express");
const router = express.Router();
const { signin, singup } = require("./controller");

router.post("/auth/signin", signin);
router.post("/auth/signup", singup);

module.exports = router;

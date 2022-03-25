const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { getTransactionList, detailTransactionList } = require("./controller");

router.get("/transactions", auth, getTransactionList);
router.get("/detailtrasactions/:id", auth, detailTransactionList);

module.exports = router;

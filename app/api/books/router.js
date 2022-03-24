const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const {
  getAllBook,
  createBooks,
  updateBooks,
  deleteBooks,
} = require("./controller");

router.get("/books", auth, getAllBook);
router.post("/books/create", auth, createBooks);
router.put("/books/edit/:id", auth, updateBooks);
router.delete("/books/delete/:id", auth, deleteBooks);

module.exports = router;

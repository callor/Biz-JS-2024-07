import express from "express";
const router = express.Router();
import { getBooks, getBook } from "../modules/naver_api.js";

/* GET home page. */
router.get("/", async (req, res) => {
  const search = req.query.search;
  console.log("search", search);
  const books = await getBooks(search);
  return res.render("index", { BOOKS: books });
});

// localhost:3000/detail/99880000
router.get("/detail/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const book = await getBook(isbn);

  return res.render("naver/book_detail", { BOOK: book });
});

export default router;

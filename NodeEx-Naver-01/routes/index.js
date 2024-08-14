import express from "express";
const router = express.Router();
import { getBooks } from "../modules/naver_api.js";

/* GET home page. */
router.get("/", async (req, res) => {
  const search = req.query.search;
  console.log("search", search);
  const books = await getBooks(search);
  return res.render("index", { BOOKS: books });
});

export default router;

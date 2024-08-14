import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  return res.render("index"); // , { title: 'Hello callor.com Express' })
  // res.send("Korea");
});

export default router;

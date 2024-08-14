// express framework 를 가져오기
import express from "express";
// express framework 를 사용하여 router 생성하기
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Hello Book");
});

export default router;

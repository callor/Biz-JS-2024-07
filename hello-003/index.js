// module 방식으로 export 된 함수를 import
import {
  arrays,
  multiArrays,
  addNation,
  viewNations,
  addNums,
  expoNum,
} from "./arrays.js";

arrays();
multiArrays();

addNation("대한민국");
addNation("미국");
addNation("영국");
addNation("프랑스");
viewNations();

addNums();
expoNum();

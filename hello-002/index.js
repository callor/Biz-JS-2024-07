let num1 = 30;
let num2 = 40;
let sum = num1 + num2;
// 문자열 Template, Template String
// expression interpolation(표현식 삽입법)
// String.format()
console.log(`${num1} + ${num2} = ${sum}`);
console.log(`${num1} + ${num2} = ${num1 + num2}`);

// arrays.js 에서 export 한 arrays 함수를 index.js 에서 사용하겠다
const { arrays, multiArrays } = require("./arrays.js");
// import 한 함수를 실행하기
arrays();
multiArrays();

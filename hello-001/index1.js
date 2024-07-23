let num1 = 100;
let num2 = 200;
let sum = num1 + num2;
console.log(`${num1} + ${num2} = ${sum}`);
console.log("안녕하세요");

const nation = "대한민국";
console.log(`우리나라는 ${nation} 입니다`);
console.log(`${num1} + ${num2} = ${num1 + num2}`);

const korea = () => {
  return "Republic of Korea";
};

// korea() 라는 함수를 호출(실행)하여 return 한 결과를 nation1 에 할당
const nation1 = korea();
console.log(`nation = ${nation1}`);

// korea 라고 선언된 함수 몸체를 통째로 nation2 에 복제하라
const nation2 = korea;
console.log(`nation2 = ${nation2}`);

// 복제된 nation2 함수를 실행하여 결과를 console 에 출력하라
console.log(`nation2 = ${nation2()}`);

import { korea1, 대한민국 } from "./module1.js";

console.log(korea1(), 대한민국());

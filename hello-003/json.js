/**
 * JSON(JavScript Object Notation,자바스크립트 객체 표현식)
 * JS 의 데이터 객체
 */
const arr = []; // 빈(blank) 배열 생성하기, push() 를 사용하여 요소 추가
const obj = {}; // 빈(blank) 객체(데이터) 생성하기

// JSON 데이터 객체 생성하기
const json = { name: "홍길동", age: 33, tel: "010-1111-1111" };

// obj 객체에 요소 추가하기
obj.name = "이몽룡";
obj.age = 20;
obj.tel = "010-2222-2222";

const viewObject = () => {
  console.log(`json :${json.name}`);
  console.log(`json :${json.age}`);
  console.log(`json :${json.tel}`);
  console.log(`obj : ${obj.name}`);
  console.log(`obj : ${obj.age}`);
  console.log(`obj : ${obj.tel}`);
};
export default viewObject;

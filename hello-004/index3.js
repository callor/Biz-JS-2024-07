const friend_1 = { 이름: "홍길동", 나이: 33, 주소: "서울특별시" };
console.log(friend_1);

let name1 = friend_1.이름;
let age = friend_1.나이;
let addr = friend_1.주소;
console.log(`${name1}, ${age}, ${addr}`);
// friend_1 객체의 각요소를 구조분해하여 개별 변수로 생성하기
const { 이름, 나이, 주소 } = friend_1;
console.log(`${이름}, ${나이}, ${주소}`);

// 객체(JSON 객체)의 깊은 복사와 일부 요소의 값 변경
// friend_1 객체를 분해하여 펼치고, 펼친 객체 요소를 사용하여
// friend_2 객체를 생성, 새로 생성한 객체의 이름 요소를 "성춘향"으로 변경
const friend_2 = { ...friend_1, 이름: "성춘향" };
console.log(friend_2);

const nums = [];
// 1 ~ 100까지 범위의 임의 수를 20개 생성하여 nums 배열에 추가하기
for (let i = 0; i < 20; i++) {
  const rndNum = Math.floor(Math.random() * 100) + 1;
  nums.push(rndNum);
}
console.log(nums);

// nums 배열에 저장된 램덤수 중에서 3의 배수만 찾아서
// num3rd 배열에 복사하기
const num3rd = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 3 === 0) num3rd.push(nums[i]);
}
console.log(num3rd);

const num3rd2 = [];
nums.forEach((num) => {
  if (num % 3 === 0) num3rd2.push(num);
});

const num3rd3 = nums.filter((num) => num % 3 === 0);

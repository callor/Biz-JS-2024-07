// 함수 밖에서 코드 상단에 선언된 변수는
// 현재 module(파일)에서 public 변수가 된다.
// public 변수는 현재 module 의 어떤 함수에서도 접근이 가능하다
const nations = [];
const nums = [];
const arrays = () => {
  const arr = [1, 2, 3];
  console.log(arr);
};
const multiArrays = () => {
  const arr = [1, 2, 3, "우리나라", "대한민국"];
  arr.push("korea");
  console.log(arr);
};

const addNation = (nation) => {
  // 매개변수로 전달받은 nation 에 저장된 값을
  // nations 배열에 추가하기
  nations.push(nation);
};
const viewNations = () => {
  // nations 배열 전체를 for를 사용하여 반복하면서
  // 각 요소의 값을 nation 변수에 담아 함수 내부로 보내서 처리하기
  // forEach 함수는 반복문을 실행할때 각요소와, index 값을 함수 내부로
  // 전달할수 있다.
  nations.forEach((nation, index) =>
    console.log(`${index} : ${nation}`)
  );
};

const addNums = () => {
  for (let i = 0; i < 10; i++) {
    const num = Math.floor(Math.random() * 10) + 1;
    nums.push(num);
  }
};

const expoNum = () => {
  // const result = nums.map((num) => num * num);
  console.log(`원본 : ${nums}`);
  const result = nums.map((num) => {
    const exp = num * num;
    return exp;
  });
  console.log(`결과 : ${result}`);
};

const expoNum2 = () => {
  const result = [];
  nums.forEach((num) => {
    result.push(num * num);
  });
  for (let i = 0; i < nums.length; i++) {
    result.push(nums[i] * nums[i]);
  }
};

// module 방식으로 함수 export 하기
export {
  arrays,
  multiArrays,
  addNation,
  viewNations,
  addNums,
  expoNum,
};

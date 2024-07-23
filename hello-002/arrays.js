// arrays 라는 함수를 선언
// 숫자 3개를 요소로 갖는 배열을 선언하고
// 배열 내용을 console 에 출력해 주는 함수
const arrays = () => {
  // int[] arr = new int[10]
  const arr = [1, 2, 3];
  console.log(arr);
};

const multiArrays = () => {
  const arr = [1, 2, 3, "대한민국", 3.0, "우리나라"];
  console.log(`원본 : ${arr}`);
  // 이미 생성된 배열에 새로운 요소를 추가하기
  // arr 배열을 파괴하거나 새롭게 생성하는 것이 아니고,
  // 이미 생성된 arr 배열에 요소만 추가하는 코드이므로
  // arr 가 const 로 선언되어도 가능한 코드이다
  arr.push("Republic of Korea");
  console.log(`push 한 후 : ${arr}`);

  // arr 배열이 const 로 선언되어 있기 때문에
  // 원본을 파괴하고 새롭게 배열을 생성하는 아래 코드는 오류가 난다
  // arr = [0,0,0,0,0,0]
};

// arrays 라는 함수를 다른 파일에서 사용하기 위해
// export 하기
exports.arrays = arrays;
exports.multiArrays = multiArrays;

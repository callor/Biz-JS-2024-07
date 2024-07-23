const nums = [1, 2, 3, 4, 5];

// === 배열의 얕은 복사, 주소복사 ====
// nums 배열을 nums1 에 복사하는데, 이때는 값이 복사되는 것이 아니고
// nums 배열의 저장소 주소가 복사되어 nums1 과 nums 배열은 동일한 데이터를
// 가리키고 있다
const nums1 = nums;
console.log("nums : ", nums, "num:1", nums1);
// 얕은 복사된 배열은 nums1 의 요소 값을 변경하면, nums 배열의 동일한
// 요소의 값도 변경되는 현상이 발생한다.
nums1[3] = 10;
console.log("nums : ", nums, "num:1", nums1);

// === map() 함수를 이용한 깊은 복사 ===
// 각 요소의 값을 새로운 배열에 복사는 것
const nums2 = nums.map((num) => {
  return num;
});
// 깊은 복사로 만들어진 배열은 전혀 다른 배열이 되고
// nums2 배열의 요소를 변경해도 nums 배열의 요소에는 영향을 미치지 않는다
nums2[0] = 10;
console.log("nums : ", nums, "num2 : ", nums2);

// === 고전적인 for 반복문과 push() 함수를 사용한 깊은 복사
const nums3 = [];
for (let i = 0; i < nums.length; i++) {
  nums3.push(nums[i]);
}
nums3[3] = 0;
console.log("nums : ", nums, "num3 : ", nums3);

// ES6 이후에 도입된 Rest 분해, Spread 연산, 구조분해
// Spread 연산을 사용한 배열의 깊은 복사
// 앝은복사 : 각 요소가 저장된 기억장소의 주소를 복사하는 것
// 깊은복사 : 각 요소의 값을 추출하여 복사하는 것
const nums4 = [...nums];

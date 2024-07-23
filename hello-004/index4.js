const arr = [];
for (let i = 0; i < 5; i++) {
  const rndNum = Math.floor(Math.random() * 100) + 1;
  arr[i] = rndNum;
}
console.log(arr);
arr[10] = 100;
console.log(arr);

const num1 = 3;
const num2 = "3";
console.log(num1 == num2);
console.log(num1 === num2);

const falsy = [null, undefined, false, NaN, 0, -0, 0n, ""];
falsy.forEach((f) => {
  console.log(`${f} : `, f || "falsy");
});

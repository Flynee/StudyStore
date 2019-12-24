// 取代正数Math.floor(), 代替负数Math.ceil()
var num1 = ~~1.69;
var num2 = 1.69 | 0;
var num3 = 1.69 >> 0;

console.log(num1);
console.log(num2);
console.log(num3);

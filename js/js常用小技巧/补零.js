var fill_zero = (num, len) => num.toString().padStart(len, "0");
var num = fill_zero(123, 5);
console.log(num);
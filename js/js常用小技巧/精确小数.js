var round_num = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
var num = round_num(1.1211000, 3);
console.log(num);
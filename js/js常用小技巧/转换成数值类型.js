// 只对null, "", false, 数值字符串有效
var num1 = +null;
var num2 = +"";
var num3 = +false;
var num4 = +"169";
var num5 = +"0012";
console.log(num1, num2, num3, num4, num5);
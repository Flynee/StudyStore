// 无法为对象去重
var arr = [1, 2, null, null, {a: 'a'}, {a: 'a'}];
var arr2 = [...new Set(arr)];
console.log(arr2);
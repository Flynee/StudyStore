var random_bound_num = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var bound = random_bound_num(3, 8);
console.log(bound);
var start_score = rate => "★★★★★☆☆☆☆☆".slice(5-rate, 10-rate);
var count = start_score(3);
console.log(count);
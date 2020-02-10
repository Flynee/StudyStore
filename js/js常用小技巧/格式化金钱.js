var format_money = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var money = format_money("123");
console.log(money);
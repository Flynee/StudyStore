var random_color = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
var color = random_color();
console.log(color);
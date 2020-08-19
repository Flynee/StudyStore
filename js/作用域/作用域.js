function a() {
    var b = 1;
    foo.call(this);
}
function foo() {
    console.log(b);
}
var b = 3;
a();
/**
 * 1.创建一个空对象
 * 2.链接该对象到另一个对象
 * 3.将新对象绑定为this上下文
 * 4.返回该对象或this
 */

 function Person(name) {
    this.name = name;
 }
 
 var person = new Person('zhangsan');
 console.log(person);

// 自定义new 方法
function _new(Fun, ...args) {
    // 1
    var obj = {};
    // 2
    Object.setPrototypeOf(obj, Fun.prototype);
    // 3
    var ret = Fun.apply(obj, args);
    return typeof ret === 'object' ? ret : obj;
}

var person2 = _new(Person, 'zhang');
console.log(person2);
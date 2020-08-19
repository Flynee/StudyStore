# 深入理解javaScript作用域链



## 什么是作用域？

> 在javaScript中只变量的可访问性和可见性



## 词法作用域

> 词法作用域就是由你写代码时将变量和块作用域写在哪里来决定的。

例:

``` javascript
let number = 42;
function printNumber() {
    console.log(number);
}

function test() {
    let number = 54;
    printNumber();
}
test(); // 42
```





## 作用域的类型

### 1.全局作用域

> 在全局作用域中的变量，可以在程序中任意位置访问。

例：

``` javascript
var say = 'Hello';
function greet() {
    console.log(say);
}
greet(); // Hello
```

## 2.局部作用域或函数作用域

> 声明在函数内部的变量只能被函数内部所访问，函数外部无权访问

例：

``` javascript
function greet() {
    var say = 'Hello';
    console.log(say);
}
greet();// Hello
console.log(say); // Uncaught ReferenceError: say is not defined
```

## 3.块级作用域

> ES6引入了let,const变量(和var 不同, var变量没有块级作用域)，他们的作用域是最近的一对花括号。他们不能被花括号之外被访问。

例：

``` javascript
{
    let say = 'Hello';
    var haha = 'hahaha';
    console.log(say); // Hello
}
console.log(haha); // hahaha

console.log(say); // Uncaught ReferenceError: say is not defined
```




# javaScript执行上下文栈

> 执行上下文是一个JavaScript代码评估和执行的抽象环境
>
> 在JavaScript中有三种类型的执行上下文：
>
> - 全局执行上下文---在浏览器中由全局对象windowc创建，
>   this被绑定为全局对象，一个程序中只有一个全局上下文
>
> - 函数执行上下文--- 函数被调用的时候会这个函数创建一
>   个执行上下文
>
> - eval执行上下文--- 在eval中执行的code也有自己的上下文

![](D:\work\StudyStore\article\img\执行上下文.png)

考虑如下代码，你认为输出的结果是什么呢？

``` javascript
a = 2;
var a;
console.log(a);
```

也许你认为的结果是undefinded, 但真是的结果是2

在看以下下面的这段代码

``` javascript
console.log(a);
var a = 2;
```

也许你认为输出的结果是2，或者你认为a没有声明，因此输出的结果可能是referenceError, 但正确的结果是undefined

为何会出现以上情况？其实是因为代码在编译阶段进行了函数提升和变量提升，例如 var a = 2; 在javaScript看来是有var a; 和 a=2; 两部分组成，var a; 会被提升，而 a = 2; 会留在原地等待执行。

**在函数声明和变量声明提升的过程中，函数首先被提升，其次才是变量。let 声明不会被提升，函数式声明不会被提升**



## 创建执行上下文

> 创建执行上下文主要分为两个阶段 创建阶段 & 执行阶段

- 创建阶段
  - 创建词法环境
  - 创建变量环境
- 执行阶段
  - 在这个阶段，所有变量的赋值都已完成，代码开始执行



**什么是词法环境呢？**

​		简单来说词法环境就是标识符与变量的映射关系，标识符通常为变量或方法的名称，而变量通常是对真实对象的引用，如下例子

``` javascript

var a = 20;
var b = 40;
function foo() {
	console.log('c');
}
// 对应的词法环境为：
lexicalEnvironment = {
	a: 20,
	b: 40,
	foo: <ref. to foo function>
}
```

词法环境的结构是怎样的呢？由上面例子，你可能已经猜出个大概，词法环境由三部分组成

- this绑定
  - 在这个组件中this的值被确定，或者被设置在全局上下文中this指代全局对象（浏览器中指代window）在函数上下文中，this指代的对象依赖于函数被引用或被调用是方式
- 环境记录器
  - 环境记录器存储了当前词法环境中变量和函数的生命位置，有如下两种类型
    - 声明式环境记录器（存储变量（包含arguments）和函数的声明，函数的词法环境包含了声明式环境记录器）
    - 目标环境记录器（全局代码的词法环境包含了目标环境记录器，目标环境记录器除了存储了变量和函数的声明，还记录了全局绑定对象（浏览器中为window），全局绑定对象的每个属性和方法都会被创建为一条条的记录）
- 外部引用
  - 它意味着当前词法环境有权访问外部词法环境，即js引擎在当前词法环境中找不到变量时，它会到外部的词法环境中寻找

**什么是变量环境呢？**

​		变量环境也是词法环境，它拥有词法环境所有的属性和组件的定义在ES6中，词法环境和变量环境唯一不同，在于词法环境存储了函数和let, const变量的绑定，而变量环境只用来存储var类型变量的绑定



## 具体流程

``` javascript
// 1. 有如下全局代码
let a = 20;
const b = 30; 
var c;
function multiply(e, f) {
	var g = 20;
	return e * f * g;
}
c = multipley(20, 30);

// 2.全局上下文创建阶段，创建全局上下文
GlobalExectionContext = {
	LexicalEnvironment: {
		EnvironmentRecord: {
			Type: "Object",
			a: <uninitiallized>, // 创建阶段的a未初始化
			b: <uninitiallized>, // 创建阶段的b未初始化
			mutiply: <func>
		}
		outer: <null>,
		ThisBinding: <Global Object>
	},

	VariableEnvironment: {
		EnvironmentRecord: {
			Type: "Object",
			c: undefined, // 创建阶段c已初始化，但未赋值
		}
		outer: <null>,
		ThisBinding: <Global Object>
	}
}

// 3.全局上下文执行阶段，变量被赋值
GlobalExectionContext = {
	LexicalEnvironment: {
		EnvironmentRecord: {
			Type: "Object",
			a:  20, // 变量已赋值
			b: 30,  // 变量已赋值
			mutiply: <func>
		}
		outer: <null>,
		ThisBinding: <Global Object>
	},

	VariableEnvironment: {
		EnvironmentRecord: {
			Type: "Object",
			c: undefined,
		}
		outer: <null>,
		ThisBinding: <Global Object>
	}
}

// 4.执行遇到mutiply(20. 30)函数,创建函数执行上下文 
FunctionExectionContext = {
	LexicalEnvironment: {
		EnvironmentRecord: {
			Type: "Declarative",
			Arguments: {0: 20, 1: 30, length: 2},
		}
		outer: <GlobalLexicalEnvironment>,
		ThisBinding: <Global Object or undefine>
	},

	VariableEnvironment: {
		EnvironmentRecord: {
			Type: "Declarative",
			g: undefined,
		}
		outer: <GlobalLexicalEnvironment>,
		ThisBinding: <Global Object or undefine>
	}
}

// 5. 函数上下文执行阶段，变量g被赋值
FunctionExectionContext = {
	LexicalEnvironment: {
		EnvironmentRecord: {
			Type: "Declarative",
			Arguments: {0: 20, 1: 30, length: 2},
		}
		outer: <GlobalLexicalEnvironment>,
		ThisBinding: <Global Object or undefine>
	},

	VariableEnvironment: {
		EnvironmentRecord: {
			Type: "Declarative",
			g: 20,
		}
		outer: <GlobalLexicalEnvironment>,
		ThisBinding: <Global Object or undefine>
	}
}

// 6.函数执行完毕，返回c值，全局上下文更新，程序运行结束
```




















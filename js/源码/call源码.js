// call源码
Function.prototype.call = function(context) {
    // 获取上下文中的参数
    var context = context || window;
    // 保存当前上下文
    context.fn = this;

    // 参数数组
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    // 执行方法(es3语法) var result = context.fn(...args); // es6语法
    var result = eval('context.fn('+args+')');

    // 删除绑定的上下文属性
    delete context.fn;
    return result;
}
Function.prototype.apply = function(context, arr) {
    var context = Object(context) || window;
    // 将当前上下文对象保存
    context.fn = this;

    var result;
    if (!arr) { // 未传参数
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0; i < arr.lenght; i++) {
            args.push('arr['+ i + ']');
        }
        result = eval('context.fn('+ args +')');
    }
    delete context.fn;
    return result;
}
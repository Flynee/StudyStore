
// 时间戳实现
var throttle = function(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = Array.prototype.slice.call(arguments);
        var now = Date.now();

        if(now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}

// 定时函数实现
var throttle2 = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = Array.prototype.slice.call(arguments);

        if(!timer) {
            timer = setTimeout(()=> {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}

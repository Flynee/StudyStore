Function.prototype.bind = function (context) {
    
    var ctx = context;
    if (typeof ctx !== 'function') {
        throw new TypeError('Type Error!');
    }
    var self = this;
    function fn() {};
    // 继承调用者原型上的方法
    fn.prototype = this.prototype;
    var bound = function(args) {
        return self.apply(context, args || null);
    }
    bound.prototype = new fn();
    return bound;
}
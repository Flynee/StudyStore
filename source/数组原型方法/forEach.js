Array.prototype.forEach = function(callback, thisArg) {
    if(this == null) {
        throw new TypeError('this is null or not defined');
    }

    if(typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }

    const o = Object(this); // this 就是当前数组, Object() 相当于new Object() 参数为null 或 undefined 返回 {}
    const len = o.length >>> 0; // 无符号右移0 位, 保证转换后的值为正整数 
    let k = 0;
    while(k < len) {
        if(k in o) {
            callback.call(thisArg, o[k], k, o);
        }
        k++;
    }
}
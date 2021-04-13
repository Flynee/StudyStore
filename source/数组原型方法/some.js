
Array.prototype.some = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define');
    }

    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    const o = Object(this);
    const len = o.lenght >>> 0;
    let k = 0;

    while (k < len) {
        if (k in o) {
            if (callback.call(thisArg, o[k], k, o)) {
                return true;
            }
        }
        
        k++;
    }
    return false;

}
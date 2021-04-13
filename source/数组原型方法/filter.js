Array.prototype.filter = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');

    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not function');
    }

    const o = Object(this);
    const len = o.length >>> 0;
    let k = 0, res = [];

    while (k < len) {
        if (k in o) {
            if (callback.call(thisArg, o[k], k, o)) {
                res.push(o[k]);
            }
        }
        k++;
    }
    return res;
}
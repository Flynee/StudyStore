Array.prototype.map = function(callback, thisArg) {
    if( this == null) {
        throw new TypeError('this is null or not defined');
    }

    if(typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function ');
    }

    const o = Object(this);
    const len = o.length >>> 0;
    let k = 0, res = [];

    while(k < len) {
        if (k in o) {
            res[k] = callback.call(thisArg, o[k], k, o);
        }
        k++;
    }
    return res;
}
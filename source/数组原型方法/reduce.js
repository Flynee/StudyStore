Array.prototype.reduce = function (callback, initialValue) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }

    const o = Object(this);
    const len =  o.length >>> o;
    let k = 0, acc;
    
    if (arguments.length > 1) {
        acc = initialValue;
    } else {
        while (k < len && !(k in o)) {
            k++;
        }

        if (k > len) {
            throw new TypeError('reduce of empty array with no initial value');
        }
        acc = o[k++];
    }

    while(k < len) {
        if (k in o) {
            acc = callback(acc, o[k], k, o);
        }
        k++;
    }
    return acc;
} 
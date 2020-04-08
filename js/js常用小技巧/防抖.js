// 在一段时间内只会执行一次
function debounce(fun, wait) {
    let timeout = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.applay(context, args);
        }, wait);
    }
}
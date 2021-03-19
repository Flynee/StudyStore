// 非立即执行版
function debounce(func, wait) {
    let timeout;
    return function() {
        const args = [...arguments];
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            func.apply(this, args);
        }, wait);
    }
}

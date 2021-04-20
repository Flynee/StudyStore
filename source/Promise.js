const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {

    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {

        // 解决 onFulfilled, onRejected 沒有传值问题
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;

        // 因为错误的值要让后面访问到，所以这里要抛出错误，不然在之后 then 的 resolve 中捕获
        onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err; }

        // 每次调用 then 都返回一个新的 promise
        let promise2 = new Promise((resolve, reject) => {

            if (this.status === FULFILLED) {

                setTimeout(() => {

                    try {
                        let x = onFulfilled(this.value);

                        // x 可能是一个 promise 
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {

                        reject(e);
                    }
                }, 0);
            }

            if (this.status === REJECTED) {

                setTimeout(() => {
                    
                    try {
                        let x = onRejected(this.reason);

                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {

                        reject(e);
                    }
                }, 0);
            }

            if (this.status === PENDING) {

                this.onResolvedCallbacks.push(() => {

                    setTimeout(() => {

                        try {

                            let x = onFulfilled(this.value);

                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {

                            reject(e);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push(() => {

                    setTimeout(() => {

                        try {

                            let x = onRejected(this.reason);

                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {

                            reject(e);
                        }
                    }, 0);
                });

            }
        });

        return promise2;
    }
}

const resolvePromise = (promise2, resolve, reject) => {

    // 自己等自己是一个错误的实现，用一个类型错误，结束掉 promise Promise/A+ 2.3.1
    if (promise2 === x) {

        return reject(
            new TypeError("Chaining cycle detected for promise #<Promise>")
        );
    }

    // Promise/A+ 2.2.3.3.3.3 只能调用一次
    let called;

    // 后续条件要严格判断，保证代码和饥饿别的库能一起使用
    if ((typeof x === 'object') || typeof x === 'function') {

        try {

            // 为了判断 resolve 过的就不用在 reject 了 （比如 reject 和 resolve 同时调用的时候）

            let then = x.then;

            if (typeof then === 'function') {

                // 不要直接写成 x.then ,  直接 then.call 就可以了， 因为 x.then 会再次取值， Object.defineProperty
                then.call(

                    x, (y) => {

                        // 根据 promise 的状态决定是成功还是失败
                        if (called) return;

                        called = true;

                        // 递归解析过程，（因为可能 promise 中还有 promise）
                        resolvePromise(promise2, y, resolve, reject);
                    }, (r) => {

                        // 只要失败，就失败
                        if (called) return;

                        called = true;
                        reject(r);
                    }
                );
            } else {

                // 如果 x.then 十几个普通值，就返回 resolve 作为结果
                resolve(x);
            }

        } catch(e) {

            // Promise/A+ 2.3.3.2
            if (called) return;

            called = true;
            reject(e);
        }
    } else {

        // 如果 x 是个普通值， 直接返回 resolve 作为结果
        resolve(x);
    }
}

Promise.resolve = function(value) {

    // 如果是 Promise, 则直接输出
    if (value instanceof Promise) {

        return value;
    }

    return new Promise(resolve => resolve(value));

}

Promise.reject = function(reason) {

    return new Promise((resolve, reject) => reject(reason));
}

Promise.all = function(promiseArr) {

    let index = 0, result = [];

    return new Promise((resolve, reject) => {

        promiseArr.forEach((p, i) => {

            Promise.resolve(p).then(val => {

                index++;

                result[i] = val;
                 
                if (index === promiseArr.length) {
                    
                    resolve(result);
                }
            });
        });
    });
}

Promise.race = function(promiseArr) {

    return new Promise((resolve, reject) => {

        promiseArr.forEach(p => {

            Promise.resolve(p).then(val => {
                resolve(val);
            }, err => {
                reject(err);
            });
        });
    });
}

Promise.allSettled = function(promiseArr) {

    let result = [];

    return new Promise((resolve, reject) => {

        promiseArr.forEach((p, i) => {

            Promise.resolve(p).then(val => {

                result.push({
                    status: 'fulfilled',
                    value: val
                });

                if (result.length === promiseArr.length) {

                    resolve(result);
                }
            }, err => {

                result.push({
                    status: 'rejected',
                    reason: err
                });

                if (result.length === promiseArr.length) {
                    
                    resolve(result);
                }
            });
        });
    });
}

Promise.any = function(promiseArr) {

    let index = 0;

    return new Promise((resolve, reject) => {

        if (promiseArr.length === 0) return;

        promiseArr.forEach((p, i) => {

            Promise.resolve(p).then(val => {

                resolve(val);
            }, err => {

                index++;

                if (index === promiseArr.length) {

                    reject(new AggregateError('All promise were rejected'));
                }
            });
        });
    });
}
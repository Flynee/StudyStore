let event {
    // 事件列表
    list: [],
    
    // 订阅事件
    on(key, fn) {
        // 判断是否有该类型事件
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },

    // 发布事件
    emit() {
        // 读取参数列表中的key
        let key = [].shift.call(arguments);
        // 获取key的函数列表
        fns = this.list[key];
        // 不存在该事件就返回false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 存在该事件，循环所有类型的事件然后进行处理
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    },

    // 取消订阅
    remove(key, fn) {
        // 找到key绑定的事件列表
        let fns = this.list[key];
        // 如果没有就返回false
        if (!fns) {
            return false;
        }
        // 清空key绑定的事件
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    },
}
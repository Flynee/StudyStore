const utils = {
    getValue(expr, vm) {
        return vm.$data[expr];
    },

    setValue(expr, vm, newVal) {
        vm.$data[expr] = newVal;
    },

    model(node, value, vm) {
        const initValue = this.getValue(value, vm);

        node.addEventListener('input', (e) => { // 实现v-model 双向绑定
            const newValue = e.target.value;
            this.setValue(value, vm, newValue);
        });
    },

    text(node, value, vm) {
        let result;
        if (value.includes('{{')) {
            //  {{xx}}
            result = value.replace(/\{\{(.+?)\}\}/g, (...args) => {
                const expr = args[1].trim();
               const w =  new Watcher(expr, vm, (newVal)=> { // dom依赖收集
                    this.textUpdater(node, newVal);
                });
                return this.getValue(expr, vm);
            });
        } else {
            // v-text="xx"
            result = this.getValue(value, vm);
        }
        this.textUpdater(node, result);
    },

    on(node, value, vm, eventName) {

    },

    textUpdater(node, value) {
        node.textContent = value;
    }
}

class Watcher { // 跟踪data中数据跟哪些dom有关联
    constructor(expr, vm, cb) {
        this.expr = expr;
        this.vm = vm;
        this.cb = cb;
        this.oldValue = this.getOldValue(); 
    }

    getOldValue() {
        Dep.target = this; // 收集当前Watcher 实例
        const oldValue = utils.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldValue;
    }

    update() {
        const newValue = utils.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }
}

class Dep { // 跟踪data中数据跟哪些Watchere有关联
    constructor() {
        this.collect = [];
    }

    addWatcher(watcher) {
        this.collect.push(watcher);
    }

    notify() {
        this.collect.forEach(w => w.update());
    }
}

class Complier { // 编译模板
    constructor(el, vm) {
        this.vm = vm;
        this.el = this.isElementNode(el) ? el : document.querySelector(el);

        // 处理dom和数据的绑定
        const fragment = this.complieFrament(this.el);
        this.complie(fragment); // 编译模板，处理模板中的数据绑定
        // 更新dom节点
        this.el.appendChild(fragment);

    }

    complie(fragment) {
        const childNodes = Array.from(fragment.childNodes); // 将NodeList类型转为Array 类型
        childNodes.forEach(childNode => {
            if (this.isElementNode(childNode)) { // 判断是否为Element节点
                // 标签h1 / input，读取属性，查看是否有v- 开头的内容
                this.complieElement(childNode);

            } else if (this.isTextNode(childNode)) {
                // 内容文本节点
                this.complieText(childNode);
            }
            // BFS深度优先遍历
            if (childNode.childNodes && childNode.childNodes.length) { // 有子节点
                this.complie(childNode);
            }
        });
    }

    complieElement(node) { // 处理标签节点
        const arributes = Array.from(node.attributes);
        // v-model v-text v-on:click
        arributes.forEach(attr => {
            const {name, value} = attr;
            if (this.isDirector(name)) { // 指令
                const [, directive] = name.split('-');
                const [complieKey, eventName] = directive.split(':');
                utils[complieKey](node, value, this.vm, eventName); // 处理不同绑定数据类型
            }
        }); 
    }
    
    isDirector(name) {
        return name.startsWith('v-');
    }

    complieText(node) {
        const content = node.textContent; // {{msg}}
        if (/\{\{(.+)\}\}/.test(content)) { // 获取msg
            utils['text'](node, content, this.vm);
        }
    }

    complieFrament(el) { // 构建fragment
        const f = document.createDocumentFragment(); // 操作fragment 不会导致UI更新
        let firstChild;
        while(firstChild = el.firstChild) { // 递归el, 将其内部标签对象插入到firstChild
            f.appendChild(firstChild);
        }
        return f;
    }

    isTextNode(el) { // 判断el是否问文本节点
        return el.nodeType === 3;
    }

    isElementNode(el) { // 判断el是否为DOM节点
        return el.nodeType === 1; // element 节点
    }
}

class Observer { // 拦截vue实例上data对象中所有属性，后期用于和模板的绑定和更新
    constructor(data) {
        this.observe(data);
    }

    observe(data) { // 观察数据的获取和更新
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]); // 递归劫持
            });
        }
    }

    defineReactive(obj, key, value) { // 使数据具有响应性
        this.observe(value); // 递归value是引用类型
        window.dep = new Dep(); // data <=> DOM 多对多关系
        Object.defineProperty(obj, key, {
            get() {
                const target = Dep.target;
                target && dep.addWatcher(target); // 收集wather
                return value;
            },
            set: (newVal)=> { // 箭头函数处理this丢失情况
                if (value === newVal) return;
                this.observe(newVal); // 递归处理newVal 是引用类型
                value = newVal;
                dep.notify(); // 通知watcher更新
            }
        });
    }
}

class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;

        // 触发this.$data.xx 和模板的绑定
        new Observer(this.$data);
        new Complier(this.$el, this);
        
        this.proxyData(this.$data);
    }

    // 可以通过this.xx 更改和访问this.$data.xx 的结果
    proxyData(data) { // 拦截vue实例
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            });
        });
    }
}

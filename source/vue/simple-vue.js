
/**
 * @description 编译模板，实现$data部分数据和模板做绑定
 */
class Complier {
    constructor(el, vm) {
        // 判断el是否是真实的DOM节点（是则返回，不是则需要查询获取）
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 根据真实DOM节点，生成frament
        const fragment = this.compileFrament(this.el);

        // 编译frament, 处理{{}},v-for,v-if,等操作符
        this.compile(fragment);

    }
    
    isElementNode(el) { // 判断当前节点是否为一个元素节点
        // nodeType 判断节点类型 值为 1 表示为一个元素节点
       return el.nodeType === 1;
    }
    
    /**
     * 利用el创建文档片段，在文档片段上进行操作，
     * 如果直接对这事DOM操作可能会引起回流和重绘，
     *  在操作完之后，进行一次性操作
     */
    compileFrament(el) {
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) { // 通过真实DOM节点构建文档片段
            f.appendChild(firstChild); // appendChild 会删除el中对应firstChild, 因此el.firstChild每次遍历后都是新值
        }
        return f;
    }

    /**
     * @description 编译模板，处理模板中的{{}},v-if,v-for等
     */
    compile(fragment) {
        const childNodes = Array.from(fragment.childNodes); // 将fragment中类数据childNodes转换为数组
        childNodes.forEach(childNode => {// 换行符也是一个节点
             

        });

    }
}

/**
 * @description 将$data数据和模板做绑定
 */
class Observer {
    constructor(data) {
        this.observe(data); // 观察者
    }

    observe(data) {
        if (data && typeof data === 'object') { // 劫持对象
          Object.keys(data).forEach(key => { // 遍历劫持每一个data 属性
              this.defineReactve(data, key, data[key]);
          });  
        }
    }
    defineReactve(obj, key, value) { // 劫持对象中的属性
        this.observe(value); // 递归处理嵌套对象，因为obj对象的属性可能是一个对象，
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set: (newVal) => {
                if (value === newVal) return;
                this.observe(newVal); // 如果newVal是对象，进行递归处理
                value = newVal;
            }
        });

    }
}
/**
 * @description 简单实现vue源码
 */
class Vue {
    constructor(options) {
        this.$el = options.el; // VNode对应的真实DOM
        this.$data = options.data;
        this.$options = options;
        // 递归观察$data数据的更新和获取
        new Observer(this.$data);
        // 处理模板，将$data中部分变量和模板做绑定
        new Complier(this.$el, this);
        // 劫持实例对当前$data数据操作
        this.proxyData(this.$data); // 代理当前对象的数据
    }
    // 提供this.xxx 来改变this.$data.xxx 的值
    proxyData(data) {
        Object.keys(data).forEach(key => { // 遍历当前对象数据kdy
            Object.defineProperty(this, key, { // 劫持当前对象实例操作
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
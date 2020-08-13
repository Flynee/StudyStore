# 虚拟dom节点

> **Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新**



## Vue.js源码VNode源码

```
export default class VNode {
    tag: string | void; // 当前节点标签名
    data: VNodeData | void; //当前节点属性数据
    children: ?Array<VNode>; // 当前节点子节点
    elm: Node | void; // 当前虚拟节点对应的真实的dom节点
    ns: string | void; // 当前节点的命名空间
    context: Component | void; // 当前节点编译的作用域
    functionalContext: Component | void; // 函数组件化作用域
    key: string | number | void; // 节点key属性，被当做节点标志，可以优化（diff算法用到）
    componentOptions: VNodeComponentOptions | void; // 当前节点对应的组件参数
    componentInstance: Component | void; // 当前节点对应的组件实例
    parent: VNode | void; // 当前节点父节点
    raw: boolean; // 原生HTML为true,普通文件为false
	isStatic: boolean; // 是否为静态节点
	isRootInsert: boolean; // 是否作为根节点插入
	isComment: boolean; // 是否为注释节点
	isCloned: boolean; // 是否为克隆节点
	isOnce: boolean; // 是否有v-once指令

	constructor(
   		tag?: string,
      	data?: VNodeData,
       	children?: ?Array<VNode>,
       	text?: string,
      	elm?: Node,
      	context?: Component,
		componentOptions?: VNodeComponentOptions
		) {
			this.tag = tag
			this.data = data
			this.children = children
    		this.text = text
    		this.elm = elm
    		this.ns = undefined
    		this.context = context
    		this.functionalContext = undefined
    		this.key = data && data.key
    		this.componentOptions = componentOptions
    		this.componentInstance = undefined
    		this.parent = undefined
    		this.raw = false
    		this.isStatic = false
    		this.isRootInsert = true
    		this.isComment = false
    		this.isCloned = false
    		this.isOnce = false
 	}
   
}
```



## Dom节点对应的VNode对象
**html**

``` html
<div class="test">
    <span class="demo">hello,VNode</span>
</div>
```

**VNode**

``` javascript
{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}
```




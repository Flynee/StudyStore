// 比较虚拟dom是否相同
function sameVnode(oldVnode, vnode) {
    return vnode.key === oldVnode.key && vnode.sel === oldVnode.sel;
}
// 获取每个子节点的key值
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch !== null) {
            key = ch.key;
            if (key !== null) {
                map[key] = i;
            }
        }
    }
    return map;
}
// 删除虚拟节点
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx < endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if(ch !== null) {
            applicationCache.removeChild(parentElm, ch.el);
        }
    }

}
// 增加虚拟节点
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (ch != null) {
            api.inserBefore(parentElm, createEle(ch).el, before);

        }
    }
}
// 判断增删节点
function patchVnode(oldVnode, vnode) {
    const el = vnode.el = oldVnode.el;
    let i,oldCh = oldVnode.children,ch = vnode.children;
    if (oldVnode === vnode) return;
    // 都只有文本节点&不相同
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text);
    } else {
        updateEle(el, vnode, oldVnode);
        if (oldCh && ch && oldCh !== ch) { // 都有子节点
            updateChildren(el, oldCh, ch);
        } else if (ch) {
            createEle(vnode);
        } else if (oldCh) {
            api.removeChildren(el);
        }
    } 
}


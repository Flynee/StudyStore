var obj = { visible: false };

function watch(obj) {
    Object.defineProperty(obj, 'visible', {
        enumerable: true,
        configurable: true,
        get: function () {
            return value;
        },
        set: function(v) {
            value = v;
            console.log('设置对象属性', v);
        }
    });
}
watch(obj);
obj.visible = true;
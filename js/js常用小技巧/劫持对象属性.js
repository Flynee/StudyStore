var obj = { visible: false };
obj.__proto__.name = 'zhang';
function watch(obj) {
    Object.defineProperty(obj, 'name', {
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


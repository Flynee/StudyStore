var obj = { visible: false };

function watch(obj) {
    Object.defineProperty(obj, 'visible', {
        get: function() {
            console.log('获取对象属性');
        },
        set: function() {
            console.log('设置对象属性');
        }
    });
}
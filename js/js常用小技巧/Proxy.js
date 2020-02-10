var obj = Object.create(null);
obj.name = 'zhang';
console.log(obj);
var proxy = new Proxy(obj, {
    get: function(obj, name) {
       return obj.name + 'zhuang';  
    },
});
console.log(proxy);
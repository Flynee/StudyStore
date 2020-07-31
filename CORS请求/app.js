var http = require('http');
var url = require('url');

// 简单请求
http.createServer(function(req, res) {
    var URL = url.parse(req.url);
    // 简单请求，响应头必须设置允许跨域的源
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    // 复杂请求,响应头除了上面，还必须设置Access-Control-Allow-Methods
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST,OPTIONS"); 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Control-Request-Method"); 
    res.setHeader("Access-Control-Max-Age", 5); 

    console.log(req.method);
    if (URL.pathname === '/test') {
        res.end(JSON.stringify({"say":"hello world:)"}));
    }
}).listen(3000, (err) => {   
    if (!err) {
        console.log('Server is running...');
    }
});
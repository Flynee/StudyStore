var http = require('http');
var querystring = require('querystring');

// 创建服务器
var server = http.createServer(function(req, res) {
    console.log(req.url);
    if(req.url === '/dopost' && req.method.toLocaleLowerCase() === 'post') {
        var allData = '';
        // 监听组装post参数
        req.addListener('data', function(chunk) {
            allData += chunk;
        });

        // 监听参数传递完成】
        req.addListener('end', function() {
            var datastring = allData.toString();
            var dataObj = querystring.parse(datastring);

            console.table(dataObj);
        });

    }
});
server.listen(3000, function(err) {
    if(!err) {
        console.log('Server is running...');
    }
});
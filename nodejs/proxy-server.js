var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');


http.createServer().on('request', function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    // 复杂请求,响应头除了上面，还必须设置Access-Control-Allow-Methods
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST,OPTIONS"); 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Control-Request-Method"); 
    res.setHeader("Access-Control-Max-Age", 5); 
    var Url = url.parse(req.url);
    var pathname = Url.pathname;
    if (pathname === '/opensource/bdz') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/bdz.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/opensource/hwg') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/hwg.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/opensource/kbs') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/kbs.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/baodian/sbgk') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/sbgk.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/jiangepanel/dy') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/dy.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/jiangepanel/xldl') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/xldl.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/jiangepanel/dl') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/dl.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/jiangepanel/glys') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./dix/glys.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    }
    if (pathname === '/') {
        res.setHeader('Content-Type', 'text/html;chartset=utf-8');
        fs.readFile('../websockt通信/03实现简单的聊天室/user-one.html', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });
    }
    // if (url === '/user/authority') {
    //     res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
    //     fs.readFile('./data/point.json', function(err, data){
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         res.end(data.toString());
    //     });

    // } else {
    //     res.setHeader('Content-Type', 'text/html;chartset=utf-8');
    //     fs.readFile('./error-page.html', function(error, data) {
    //         if (error) {
    //             console.log(error);
    //             return;
    //         }
    //         res.end(data.toString());
    //     });
    // }
    if(pathname === '/test/post') {
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
            res.end('post请求完成');
        });

    }
    if(pathname === '/test/get') {
        res.end('get请求完成');
    }

}).listen('3000', function() {
    console.log('Serve is running!');
    console.log('http://localhost:3000');
});
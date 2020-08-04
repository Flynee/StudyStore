var http = require('http');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req, res) {
    var URL = url.parse(req.url);
    var params = querystring.parse(URL.query);
    if (URL.pathname === '/test') {
        var data = {
            say: params.user+'hello world:)'
        };
        var callback = params.callback + "("+JSON.stringify(data)+")";
        console.log(callback);
        res.end(callback);
    }
}).listen(3000, (err) => {   
    if (!err) {
        console.log('Server is running...');
    }
});
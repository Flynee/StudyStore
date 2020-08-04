var http = require('http');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req, res) {
    var URL = url.parse(req.url);
    var params = querystring.parse(URL.query);
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    if (URL.pathname === '/test') {
        res.end('hello world:)');
    }
}).listen(3000, (err) => {   
    if (!err) {
        console.log('Server is running...');
    }
});
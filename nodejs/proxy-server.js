var http = require('http');
var fs = require('fs');

http.createServer().on('request', function(req, res){
    var url = req.url;
    if (url === '/user/authority') {
        res.setHeader('Content-Type', 'text/josn;chartset=utf-8');
        fs.readFile('./data/point.json', function(err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.end(data.toString());
        });

    } else {
        res.setHeader('Content-Type', 'text/html;chartset=utf-8');
        fs.readFile('./error-page.html', function(error, data) {
            if (error) {
                console.log(error);
                return;
            }
            res.end(data.toString());
        });
    }

}).listen('3000', function() {
    console.log('Serve is running!');
    console.log('http://localhost:3000');
});
const http = require('http');
const url = require('url');
const ejs = require('ejs');

http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname;

    if(pathname == '/login') {
        const backData = {
            age: 18,
            arr: [{name: 'z'}, {name: 'a'},]
        };

        ejs.renderFile('./login.ejs', backData, (err, data) => {
            if(err) {
                console.error(err);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        });
    }


}).listen(8888, (err)=> {
    if(err) {
        console.error(err);
        return;
    }
    console.log('Serve is running');
});
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');



app.listen(8888, () => {
    console.log('Server is runnig...');
});


function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading 500!');
        }
        res.writeHead(200);
        res.end(data);
    });

}

// 监听用户连接事件
io.on('connection', socket => {
    console.log('用户连接');
    // 给浏览器发送消息 参数1是自定义的消息类型
    socket.emit('send', {name: 'zhang'});
});
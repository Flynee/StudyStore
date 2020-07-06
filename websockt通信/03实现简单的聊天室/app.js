var ws = require('nodejs-websocket');
var uuid = require('uuid');
var PORT = 8888;
var count = 0;

var server = ws.createServer(connect => {
    count++;
    connect.userName = `用户${uuid.v4()}`;

    // 当有新用户连接，要告诉所有人
    broadcast(`傻逼${connect.userName}上线了  :) `);

    // 监听用户发送的消息
    connect.on('text', (data)=> {
        broadcast(`傻逼${connect.userName}说：${data}`);
    });
    // 监听用户关闭连接
    connect.on('close', ()=> {
        count--;
        // 告知所有用户，有人下线
        broadcast(`傻逼${connect.userName}下线了 :) `);
    });
    // 处理连接异常
    connect.on('error', () => {
        console.log('处理异常');
    });
});

server.listen(PORT, () => {
    console.log('Server is running...');
});

function broadcast(message) {
    server.connections.forEach(conn => {
        conn.send(message);
    });
}
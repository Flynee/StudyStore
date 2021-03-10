var ws = require('nodejs-websocket');
var uuid = require('uuid');
// var generateRandomChineseName = require('random-chinese-name-generator');
var { generateRandomChineseName } = require('random-chinese-name-generator');
var PORT = 8888;
var count = 0;

var server = ws.createServer(connect => {
    count++;
    // connect.userName = `用户${uuid.v4()}`;
    connect.userName = generateRandomChineseName();
    console.log(connect);
    const data = {
        ip: '',
        text: `${connect.userName}上线了  :) `,
        people: '',
    };
    // 当有新用户连接，要告诉所有人
    broadcast(JSON.stringify(data));

    // 监听用户发送的消息
    connect.on('text', (data)=> {
        const msg = JSON.parse(data);
        msg.people = `${connect.userName}说：`;
        broadcast(JSON.stringify(msg));
    });
    // 监听用户关闭连接
    connect.on('close', ()=> {
        count--;
        const data = {
            ip: '',
            text: `${connect.userName}下线了 :) `,
            people: '',
        };
        broadcast(JSON.stringify(data));
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
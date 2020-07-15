// 引入依赖
var ws = require('nodejs-websocket');
var PORT = 8888;

// 创建websockt服务
// 只要有用户连接，就会创建一个connect连接对象
const server = ws.createServer(connect => {
    console.log('有人连接上来了');
    // // 监听用户发送的数据
    // connect.on('text', function(data) {
    //     console.log(data);
    //     connect.send('欢迎欢迎');
    // });
    // // 监听用户断开连接
    // connect.on('close', function(...arg) {
    //     console.log('用户断开连接', [...arg]);
    // });
    setInterval(()=> {
        connect.send('webworker数据'+Math.random() * 1000);
    }, 3000);
    // 处理异常
    connect.on('error', function(...arg) {
        // console.log('------------ :)');
    });
});
server.listen(PORT, () => {
    console.log('服务启动成功 :)');
});
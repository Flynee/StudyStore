    // 构建实例
    var socket = new WebSocket('ws://localhost:8888');
    // 监听服务器消息
    socket.addEventListener('message', (message)=> {
        this.postMessage(message.data);
    });
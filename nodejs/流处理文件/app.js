var fs = require('fs');
var http = require('http');

// 创建一个大文件
// var file = fs.createWriteStream('./big.txt');
// for(var i=0; i <=1e6; i++) {
//     file.write('测试写入流，，，hellworld');
// }

http.createServer().on('request', (req, res)=> {
    // 只返回整个文件（内存暴涨）
    // fs.readFile('./big.txt', (err, data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     res.end(data);
    // });
    // 通过管道(防止内存暴涨)
    var file = fs.createReadStream('./big.txt');
    file.pipe(res)
}).listen(3333, (err) => {
    if(err) {
        throw err;
    }
    console.log('Server is running...');
});

// 复制文件
// fs.readFile('./big.txt', (err, data) => {
//     if(err) {
//         throw err;
//     }
//     fs.writeFile('./big.bck.txt', data, (err) => {
//         if(err) {
//             throw err;
//         }
//     });
// });
// 通过流与管道复制文件
// var file = fs.createReadStream('./big.txt');
// file.pipe(fs.createWriteStream('./big.bck'));
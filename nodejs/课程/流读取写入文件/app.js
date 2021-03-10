const fs = require('fs');


// 创建一个写入流
// const writeStream = fs.createWriteStream('./test-stream.txt');
// let str = '';

// for(let i=0; i <=500; i++) {
//     str += '测试写入流\n';
// }

// writeStream.write(str);

// // 关闭写入流，可触发finish事件
// writeStream.end();
// writeStream.on('finish', ()=> {
//     console.log('写入完成');
// });

// let count = 0;
// let str = '';
// // 创建一个读取流
// const readStream = fs.createReadStream('./test-stream.txt');

// // 每次读取64kb数据
// readStream.on('data', (data)=>{
//     count++;
//     str += data;
// });

// readStream.on('end', ()=> {
//     console.log(count);
// });

// readStream.on('error', (err)=> {
//     console.error(err);
// });


// 测试管道流
const readStream = fs.createReadStream('./test-stream.txt');
const writeStream = fs.createWriteStream('./test-steam2.txt');
readStream.pipe(writeStream);
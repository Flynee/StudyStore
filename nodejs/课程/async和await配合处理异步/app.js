// 处理异步数据例子
// async function test() {
//     return new Promise((resolve, reject) => {
//         setTimeout(()=> {
//             resolve('卧槽，异步');
//         }, 1000);
//     });
// }

// async function main() {
//     const data = await test();
//     console.log(data);
// }
// main();

const fs = require('fs');

// 通过使用async 和 await 处理fs异步方法
// 判断是否为目录
async function isDir(path) {
    return new Promise((resolve, reject)=> {
        fs.stat(path, (err, stats)=> {
            if (err) {
                console.error(err);
                return reject(err);
            }
            if (stats.isDirectory()) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function main() {
    const path = '../';
    const dirArr = [];

    
    // await 只能使用在async 方法内部
    fs.readdirSync(path, async (err, data)=> {
        if (err) {
            console.error(err);
            return;
        }
        for(let i=0; i<data.length; i+=1) {
            if (await isDir(path + data[i])) {
                dirArr.push(data[i]);
            }
        }
        console.log(dirArr);
    });
}
main();
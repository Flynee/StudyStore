/**
 * 1. fs.stat 检测是文件还是目录
 * 2. fs.mkdir 创建目录
 * 3. fs.writeFile 创建写入文件
 * 4. fs.appendFile 追加文件
 * 5. fs.readFile 读取文件
 * 6. fs.readdir 读取目录
 * 7. fs.rmdir 删除目录
 * 8. fs.unlink 删除文件
 * 9. fs.rename 重命名
 */

const fs = require('fs');

fs.stat('./package.json', (err, data)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data.isFile());
    return;

});

/**
 * 参数1: path 创建目录的路径
 * 参数2： mode 目录的读写权限， 默认777
 * 参数3： callback 创建后的回调函数
 */
fs.mkdir('./test-mkdir', (err)=> {
    if(err) {
        console.log(err);
        return;
    }
    console.log('创建成功');
    return;
});

/**
 * 无论是否存在此文件，都会重新创建
 */
fs.writeFile('./test-mkdir/testWriteFile.txt', 'hello writeFile', (err)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log('写入成功');
});

/**
 * 存在此文件则追加，不存在此文件则新建此文件
 */
fs.appendFile('./test-mkdir/testWriteFile.txt', '我是追加文件卧槽', (err) => {
    if (err) {
        console.error(err);
        return;
    } 
    console.log('文件追加成功');

});

fs.readFile('./test-mkdir/testWriteFile.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data); // Buffer 类型数据
    console.log(data.toString()); // 将Buffer 类型转换为String类型
});

/**
 * 返回该目录下所有的文件及目录名称的数组
 */
fs.readdir('./', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

/**
 * 可以给文件重命名和移动文件位置
 */
fs.rename('./test-mkdir/testWriteFile.txt', './test-mkdir/testWriteFile-rename.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

fs.unlink('./test-mkdir/testWriteFile.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('删除文件成功');
});

fs.rmdir('./test-mkdir', (err) => {

    if (err) {
        console.error(err);
        return;
    }
})

// 使用mkdirp 创建多级目录
const mkdirp = require('mkdirp');

mkdirp('./test-mkdirp/children/').then( (made ) => {
    if (made) {
        console.error(made);
    };
});
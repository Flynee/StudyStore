var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// 创建一个文件可读流
var flie_path = path.resolve(__dirname, './config.js');
var buffer = fs.readFileSync(flie_path);
var fs_hash = crypto.createHash('md5');

fs_hash.update(buffer);
var md5 = fs_hash.digest('hex');
console.log("文件的MD5是：%s", md5);
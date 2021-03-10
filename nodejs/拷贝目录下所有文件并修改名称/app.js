var fs = require('fs');

var file = fs.createReadStream('./test');
file.stat();
// file.pipe(fs.createWriteStream('./big.bck'));
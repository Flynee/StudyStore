var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3333',
    password: 'root',
    database: 'campus',
});

conn.connect();

conn.query('select * from user', function(err, result, fields){
    if (err) throw err;
    console.table(result);
    console.table(fields);
});
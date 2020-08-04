var fs = require('fs');
var geobuf = require('geobuf');
var Pbf = require('pbf');

fs.readFile('./test.geojson', (err, data) => {
    if (err) throw err;
    var featureCollection = JSON.parse(data.toString());
    let buffer = geobuf.encode(featureCollection, new Pbf());
    fs.writeFile('./test.geobuf.bpf', buffer, (err) => {
        if (err) throw err;
        console.log('geobuf is ok!');
        fs.readFile('./test.geobuf.bpf', (err, data) => {
            let geojson = geobuf.decode(new Pbf(data));
            console.log(JSON.stringify(geojson));
            fs.writeFile('./test2.geojson', JSON.stringify(geojson), (err) => {
                if (err) throw err;
            });
        });
    });
  });
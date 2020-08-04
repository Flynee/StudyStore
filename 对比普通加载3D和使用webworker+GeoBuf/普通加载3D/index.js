window.onload = function() {
    // 初始化场景
    var app = new THING.App({
        container: 'div3d'
    });
    var map = app.create({
        type: 'Map',
    });
    // 创建一个瓦片图层
	var tileLayer = app.create({
		type: 'TileLayer',
		name: 'tileLayer1',
		url: 'https://mt0.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
	});
	// 向地球添加一个瓦片图图层
    map.addLayer(tileLayer);
    app.camera.flyTo({
		position: [2711306.3962899176, 3313685.898202407, 4728023.725230151],
        target: [2713222.1779201543, 3311167.383410648, 4727946.6585309515],
        time: 2000
    });
    // 创建建筑
    axios.get('./building.geojson').then(data => {
        console.log(data);
    });
    
}
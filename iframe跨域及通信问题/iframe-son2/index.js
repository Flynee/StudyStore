
window.onload = function () { 
    console.log('正在获取数据...');
    var loginName;
    var loginType;
    window.addEventListener('message', function(event) {
        var origin = event.origin || event.originalEvent.origin;
        if (origin === 'http://192.168.202.90:5556') {
            var data = event.data;
            loginName = JSON.parse(data).userName;
            loginType = JSON.parse(data).type;
            console.log(loginName, loginType);
        }
    }, false);
}
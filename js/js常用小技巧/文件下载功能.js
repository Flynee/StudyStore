function openDownload(url) {
    let d = new Date().getTime();
    let saveName=d+"."+ url.replace(/(.*\.)/, '');//这里文件名我用了毫秒数加上后缀
    const $a = document.createElement('a');
    $a.setAttribute("href", url);
    $a.setAttribute("download", saveName);
    $a.setAttribute("target","_blank");//弹出窗体
    //模拟js事件
    const evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
    $a.dispatchEvent(evObj);
},
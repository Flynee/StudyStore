function getOffsetHeight() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(dom.offsetHeight);
}
function getClientHeight() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(dom.clientHeight);
}
function getMarginTop() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['margin-top']);
}
function getMarginBottom() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['margin-bottom']);
}
function getPaddingTop() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['padding-top']);
}
function getPaddingBottom() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['padding-bottom']);
}
function getBorderTop() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['border-top-width']);
}
function getBorderBottom() {
    var dom = document.getElementsByClassName('test-box')[0];
    console.log(getComputedStyle(dom, null)['border-bottom-width']);
}
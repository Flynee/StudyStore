## AJAX使用解析（Asynchronous Javascript And XML）

> - Ajax原理简单来说，就是通过XMLHttpRequest对象向服务器发送异步请求
>
> * 浏览器（创建XMLHttpRequest对象，发送HttpRequest）-> 服务器（处理HttpRequest,创建响应数据返回给浏览器）->浏览器（使用js处理服务器返回的数据）



### 发送一个ajax请求

```javascript
function sendRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari浏览器
        xmlhttp = new  XMLHttpRequest();
    } else {
     	// IE6, IE5浏览器   
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    console.log(xmlhtpp); // 查看实例信息
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            	console.log(xmlhttp);
            }
    }
    /** POST请求
     * xmlhttp.open("POST", "/api", true);
     * xmlhttp.setRequestHeader("Content-type", "application/x-www-form-				 * urlendcoded");
     * xmlhtpp.send('name=zhang&age=18');
     */
    // GET 请求
    xmlhttp.open("GET", "/api?name=zhang&age=18", true);
    xmlhttp.send();
    
}
```



### 请求方法（GET、POST）

> xmlhttp.open(method, url, async);
>
> setRequestHeader(header, value)； // GET请求不需要设置
>
> xmlhttp.send(data);

| 方法                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| open(method, url, async)        | method: "GET" or "POST"<br>url: 请求路径（包含参数）<br>async: true(异步) or false(同步) |
| setRequestHeader(header, value) | header: 设置请求头名称<br/>value: 设置请求头的值             |
| send(data)                      | data 仅用于POST请求                                          |



### onreadystatechange 事件

> 每当xmlhttp 实例属性<strong>readyState</strong>值发生变化时，就会触发<em>onreadystatechange</em>方法
>
> 在<em>onreadystatechange</em>方法中调用xmlhttp实例属性responseText(字符串形式数据)或responseXML(XML形式数据)，即可拿到服务器响应的数据

* readySate有如下几个值
  * 0：请求未初始化
  * 1：服务器连接已建立
  * 2：请求已接收
  * 3：请求处理中
  * 4：请求已完成，且响应就绪
* 当前响应就绪时，通过判断xmlhttp的<strong>status</strong>属性值来判断数据响应是否出现异常，<strong>status</strong>属性值如下
  * 200：数据响应成功
  * 204：请求处理成功，没有响应数据
  * 301：永久重定向，请求资源已被费配到新的URI
  * 302：临时重定向
  * 304：表示客户端发送附带条件（采用GET请求，请求报文中含有if-matched, if-modified-since, if-none-match, if-unmodified-since, if-range 任何一个）的请求时，服务器允许访问资源，但因发生请求不满足条件，直接返回304Modified
  * 400：请求报文存在语法错误
  * 401：未授权
  * 403：请求资源被服务器拒绝了
  * 404：请求资源不存在
  * 500：服务器执行请求时出现错误
  * 503：服务器超负载了，或停机了
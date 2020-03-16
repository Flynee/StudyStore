/*
 * @Author: yuanzhiyu
 * @Change: 更改者
 * @Date: 2020-02-10
 * @Description: 配置项目不会变动的必须参数,及模拟参数
 */
/* eslint-disable quote-props */
/* eslint no-unused-vars: 'off' */
const CONFIG = {
    // 项目名称
    projectTitle: 'proxima_b',
    // websocket服务地址
    // websocketUrl: '192.168.202.116:7779',
    websocketUrl: '192.168.202.116:10010',
    // 后台接口地址
    // remote: 'http://lix.eicp.net:10010',
    // remote: '192.168.202.116:7779',
    remote: 'http://192.168.202.116:10010',
    // 项目版本号
    version: '2.15.31_beta',
    // 使用场景的索引
    sceneIndex: 0,
    // 处理第三方告警的链接
    cAlarm: 'http://www.baidu.com',
    // 跳转至预案链接
    prePlan: 'http://www.baidu.com',
    // 模拟自动定位的告警设备的id
    autoLocateDeviceId: ['1_10000805', '1_10000806'],
};

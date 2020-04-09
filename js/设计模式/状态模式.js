// 创建超级玛丽状态类
var MarryState = function() {
    // 内部状态私有变量
    var _currentState = {};
    // 动作与状态方法映射
    var states = {
        // 跳跃
        jump: function() {
            console.log('跳跃');
        },
        // 移动
        move: function() {
            console.log('移动');
        },
        // 射击
        shoot: function() {
            console.log('射击');
        },
        // 蹲下
        squat: function() {
            console.log('蹲下');
        },
    };

    // 动作控制类
    var Action = {
        // 改变状态的方法
        changeState: function() {
            // 组合动作通过传递多个参数实现
            var arg = arguments;
            // 重置内部状态
            _currentState = {};
            // 如果有动作则添加动作
            if(arg.length) {
                for(var i=0, len = arg.length; i < len; i++) {
                    // 向内部状态中添加动作
                    _currentState[arg[i]] = true;
                }
            }
            // 返回状态控制类
            return this;
        },
        // 执行动作
        goes: function() {
            console.log('触发一次动作');
            // 遍历内部状态保存的动作
            for(var i in _currentState) {
                // 如果该动作存在则执行
                states[i] && states[i]();
            }
            return this;
        }
    };

    // 返回接口方法change, gose
    return {
        change: Action.changeState,
        goes: Action.goes
    }
}

var marry = new MarryState();
marry.change('jump', 'shoot')
    .goes()
    .change('shoot')
    .goes()
    .goes();


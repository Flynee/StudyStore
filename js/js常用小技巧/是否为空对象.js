function judge_data_type(target, type) {
    var data_type = Object.prototype.toString.call(target).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? data_type === type : data_type;
}

var obj = [];
var flag = judge_data_type(obj, "object") && !Object.keys(obj).length;
console.log(flag);
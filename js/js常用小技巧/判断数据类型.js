/**
    undefined、null、string、number、boolean、array、object、symbol、date、regexp、
    function、asyncfunction、arguments、set、map、weakset、weakmap

**/
function judge_data_type(target, type) {
    var data_type = Object.prototype.toString.call(target).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? data_type === type : data_type;
}

var result = judge_data_type(1234, "string");
var result2 = judge_data_type(new Date());
console.log(result);
console.log(result2);
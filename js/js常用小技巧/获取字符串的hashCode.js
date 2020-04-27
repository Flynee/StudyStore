function hashCode(str){  
    var h = 0, off = 0;  
    var len = str.length;  
  
    for(var i = 0; i < len; i++){  
        var tmp=str.charCodeAt(off++);  
        h = 31 * h  + tmp;  
        if(h>0x7fffffff || h<0x80000000){  
            h=h & 0xffffffff;  
        }  
    }  
    return String(h);  
};  
    var bbb = 'Hhelloworld';
    var a = hashCode(bbb);
    console.log(a, typeof a);
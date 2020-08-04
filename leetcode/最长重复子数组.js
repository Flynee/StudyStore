/**
 * @description 给两个整数数组 A 和 B ，
 * 返回两个数组中公共的、长度最长的子数组的长度。
 * @param {number []} arr1 
 * @param {number []} arr2 
 * @solution DP
 */
function maxLength(arr1, arr2) {
    var i,j;
    var max = 0;
    // 构建匹配数组
    for (var i=0; i<arr1.length; i++) {
        for (var j=0; j<arr2.length; j++) {
            if(arr1[i-1] && arr2[j-1] && arr1[i-1] === arr2[j-1] && arr1[i] === arr2[j]){
                max += 1;
            } else if(arr1[i-1] === arr2[j-1]) {
                max = max > 1 ? max : 1;
            }
        }
    }
    return max;
}

/**
 * 滑动窗口解法(暂未理解)
 * 
 */
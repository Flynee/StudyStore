function a(str) {
    if (!str) {
        return 0;
    }
    const map = new Map();
    let max = 1;
    let i = 0;
    for (let j = 0; j < str.length; j += 1) {
        if (map.has(str.charAt(j))) {
            i = map.get(str.charAt(j)) + 1 > i ? map.get(str.charAt(j)) + 1 : i;
            console.log(i);
        }
        max = (j - i + 1) > max ? (j - i + 1) : max;
        map.set(str.charAt(j), j);
    }
    // console.log(max);
    return max;
}
a('abba');

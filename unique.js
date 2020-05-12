// 相邻不等去重法
// 缺点{} 没有去重
function unique(arr) {
    arr.sort();
    const { length } = arr;
    const newArr = [arr[0]];
    for (let i = 1; i < length; i++) {
        const A = arr[i];
        const B = arr[i - 1];
        if (A !== B) {
            if (A !== A && B !== B) {
                continue;
            }
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// 利用 hasOwnProperty 去重
// 缺点所有{}对象只保留第一个
function _unique(arr = []) {
    const obj = {};
    return arr.filter((item) => {
        const property = typeof item + item;
        return obj.hasOwnProperty(property) ? false : obj[property] = true;
    })
}
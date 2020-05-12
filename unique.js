// 相邻不等去重法
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

// {} 没有去重
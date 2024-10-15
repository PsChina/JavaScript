// 扩展reduceMap
Array.prototype.reduceMap = function({compute,to} = {},reducer=_=>undefined) {
    if(this.length){
        let reduce = typeof this[0] === 'object'&&this[0][to]
        return this.map(item=>{
            reduce = reducer(item[compute],reduce)
            item[to] = reduce
            return item
        })
    }
    return this
}

/**
 * const arr = [
 *          {index:0,totalSonAmount:0,volume:1},
 *          {index:1,totalSonAmount:0,volume:1},
 *          {index:2,totalSonAmount:0,volume:1},
 *          {index:3,totalSonAmount:0,volume:1}
 *       ] 
 * 
 *  arr.reduceMap({compute:'volume',to:'totalSonAmount'},(a,b)=>a+b)
 * 
 * (4) [{…}, {…}, {…}, {…}]
 * 0: {index: 0, totalSonAmount: 1, volume: 1}
 * 1: {index: 1, totalSonAmount: 2, volume: 1}
 * 2: {index: 2, totalSonAmount: 3, volume: 1}
 * 3: {index: 3, totalSonAmount: 4, volume: 1}
 */

/**
 * reduce 函数
 * 接收一个回调函数 遍历数组  传递 该函数上次执行的结果和数组下一个元素给该回调函数并且保存运行结果 遍历完成后返回最终运行结果 （这里是模拟所以会多一个arr）
 * **/
function reduce(arr, fn) {
  // prev 默认值为数组的第一个元素
  let prev = arr[0];
  // 遍历数组 （因为取数组元素会+1所以遍历到 length - 1 就够了）
  for (let i = 0; i < arr.length - 1; i++) {
    // 1、调用外面传进来的函数 将 prev 作为第一个参数传递给外面的函数 将数组的下一个元素作为第二个参数传递给 外面的函数
    // 2、fn函数执行完毕后返回值保存在 prev 以便下一次使用
    prev = fn(prev, arr[i + 1]);
  }
  // 遍历完后返回最终的 prev 的值
  return prev;
}

// 测试 reduce 函数 计算 [1, 2, 3, 4, 5] 的和
const reduceResult = reduce([1, 2, 3, 4, 5], function (prev, item) {
  return prev + item;
});
// 输出结果
console.log(reduceResult);

/**
 * map 函数
 * 接收一个回调函数 遍历数组 将每个数组元素当做参数传递给这个函数并且调用 得到一个新的返回值 保存在新数组中 遍历完成后返回这个新数组（这里是模拟所以会多一个arr）
 * **/
function map(arr, fn) {
  // 定义新数组
  const new_array = [];
  // 遍历数组
  for (let i = 0; i < arr.length; i++) {
    // 取出当前遍历到的元素
    const item = arr[i];
    // 将元素 item 作为参数传递给 fn 并且运行得到一个新的 元素 newItem
    const newItem = fn(item);
    // 将新的 item 保存在 新数组中
    new_array.push(newItem);
  }
  // 遍历完成返回新数组
  return new_array;
}
// 测试 map 函数 将数组 [1,2,3] 里面的元素扩大一倍
const mapResult = map([1, 2, 3], function double(item) {
  return item * 2;
});
// 输出结果
console.log(mapResult);

//也可以写成以下形式 (先定义 double 函数 再把 double 函数当做参数传递给 map )
function double(item) {
  return item * 2;
}

const mapResult2 = map([1, 2, 3], double);

console.log(mapResult2);

// 同理 reduce 的测试函数也可以写成先定义再调用的方式

function plus(a, b) {
  return a + b;
}

const arr = [1, 2, 3, 4, 5];

const reduceResult2 = reduce(arr, plus);

console.log(reduceResult2);

// 也可以实现不一样的功能 比如累乘

function multiplication(a, b) {
  return a * b;
}

const arr3 = [1, 2, 3, 4, 5];

const reduceResult3 = reduce(arr3, multiplication);

console.log(reduceResult3);

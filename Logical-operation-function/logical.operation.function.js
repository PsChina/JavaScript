
// 与
const and = a=>b=>a&b
// 或
const or = a=>b=>a||b
// 非
const not = a=>!a
// 并
const add = function(a){
    return function(b){
        if(a instanceof Array){
            return a.concat(b)
        }else if(a instanceof Set){ // week set and map week map to do
            return new Set([...a],[...b])
        } else if(a instanceof Object) {
            return Object.assign({},a,b)
        } else {
            return a+b
        }
    }
}
// 交
const intersection = function(a){
    return function(b){
        if(a instanceof Array){
            // 定义一个空数res组作为返回值的容器，基本操作次数1。
            const res = []
            // 定义一个对象用于装数组一的元素，基本操作次数1。
            const objectA = {}
            // 使用对象的 hash table 存储元素，并且去重。基本操作次数2n。
            for(const ele of a) { // 取出n个元素n次
                objectA[ele] = undefined // 存入n个元素n次
            }
            // 定义一个对象用于装数组二的元素，基本操作次数1。
            const objectB = {}
            // 使用对象的 hash table 存储元素，并且去重。基本操作次数2n。
            for(const ele of b){ // 取出n个元素n次
                objectB[ele] = undefined // 存入n个元素n次
            }
            // 使用对象的 hash table 删除相同元素。基本操作次数4n。
            for(const key in objectA){ //取出n个key (n次操作)
                if(key in objectB){ // 基本操作1次 (外层循环n次)
                    delete objectB[key] // 基本操作1次 (外层循环n次)
                    delete objectA[key] // 基本操作1次 (外层循环n次)（总共是3n 加上n次取key的操作 一共是4n）
                }
            }
            // 将第一个对象剩下来的key push到res容器中，基本操作次数是3n次(最糟糕的情况)。
            for(const key in objectA){ // 取出n个元素n次(最糟糕的情况)。
                res[res.length] = key // 读取n次length n次，存入n个元素n次，一共2n(最糟糕的情况)。
            }
            // 将第二个对象剩下来的key push到res容器中，基本操作次数也是3n次(最糟糕的情况)。
            for(const key in objectB){ // 取出n个元素n次(最糟糕的情况)。
                res[res.length] = key // 读取n次length n次，存入n个元素n次，一共2n(最糟糕的情况)。
            }
            // 返回结果，基本操作次数1。
            return res
        } else if(a instanceof Set){ // week set and map week map to do
            const newSet = new Set()
            for(const item of a){
                if(b.has(item)){
                    newSet.add(item)
                }
            }
            return newSet
        } else if(a instanceof Object){
            const newObj = {}
            for(const key in a){
                if(b.hasOwnProperty(key)){
                    newObj[key] = a[key] 
                }
            }
            return newObj
        }
    }
}
// 补
const complementarySet = function(a){ // 全集
    return function(b){ // 要操作的集合
        if(a instanceof Array){
            const setA = new Set(a)
            const setB = new Set(b)
            for(const item of setB){
                if(setA.has(item)){
                    setA.delete(item)
                }
            }
            return [...setA]
        } else if(a instanceof Set) { // week set and map week map to do
            const setA = new Set(A)
            for(const item of b){
                if(setA.has(item)){
                    setA.delete(item)
                }
            }
            return setA
        } else if (a instanceof Object){
            const cloneA = Object.assign({},a)
            for(const key in b){
                if(cloneA.hasOwnProperty(key)){
                    delete cloneA[key]
                }
            }
            return cloneA
        }
    }
}


// 同或
const xnor = a=>b=>a===b
// 异或
const xor = a=>b=>a!==b

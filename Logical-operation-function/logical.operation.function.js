
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
            const newSet = new Set()
            const SetB = new Set(b)
            for(const item of a){
                if(SetB.has(item)){
                    newSet.add(item)
                }
            }
            return [...newSet]
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
        } else {
            return a - b
        }
    }
}


// 同或
const xnor = a=>b=>a===b
// 异或
const xor = a=>b=>a!==b

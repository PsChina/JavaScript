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
 * length: 4
 * __proto__: Array(0)
 */
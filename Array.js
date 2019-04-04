// 扩展reduceMap
Array.prototype.reduceMap = function({dealAttr,changeAttr} = {},fn=_=>undefined) {
    let sum = this[0][changeAttr]
    return this.map(item=>{
        sum = fn(item[dealAttr],sum)
        item[changeAttr] = sum
        return item
    })
}

/**
 * const arr = [
 *          {index:0,totalSonAmount:0,volume:1},
 *          {index:1,totalSonAmount:0,volume:1},
 *          {index:2,totalSonAmount:0,volume:1},
 *          {index:3,totalSonAmount:0,volume:1}
 *       ] 
 * 
 *  arr.reduceMap({dealAttr:'volume',changeAttr:'totalSonAmount'},(a,b)=>a+b)
 * 
 * (4) [{…}, {…}, {…}, {…}]
 * 0: {index: 0, totalSonAmount: 1, volume: 1}
 * 1: {index: 1, totalSonAmount: 2, volume: 1}
 * 2: {index: 2, totalSonAmount: 3, volume: 1}
 * 3: {index: 3, totalSonAmount: 4, volume: 1}
 * length: 4
 * __proto__: Array(0)
 */
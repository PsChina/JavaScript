Vue.prototype.$is_locked = Symbol('$is_locked')
Vue.prototype.$caller_set = Symbol('$caller_set')
// 函数去抖
Vue.prototype.debounce = function (func = _ => undefined, interval = 0, ...args) {
    const {$is_locked, $caller_set} = Vue.prototype
    // 如果函数因为未达到解锁时间而处于锁定状态，直接结束函数
    if (func[$is_locked] && func[$caller_set] && func[$caller_set].has(this)) return
    // 否则锁住这个函数
    func[$is_locked] = true
    if(func[$caller_set] === undefined){
        func[$caller_set] = new Set()
    }
    // 把调用者加入set
    func[$caller_set].add(this)
    // 立即调用
    func.apply(this, args)
    // 等达到去抖保护时间后解锁函数，并且去掉调用者。
    setTimeout(_ => {
        func[$is_locked] = false
        func[$caller_set].delete(this)
    }, interval)
}


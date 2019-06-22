// debounce 3.0
function debounce(func, interval) {
    if (func === void 0) { func = function () { return undefined; }; }
    if (interval === void 0) { interval = 0; }
    var $IS_LOCKED = Symbol('$IS_LOCKED');
    var $CALLER_SET = Symbol('$CALLER_SET');
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var _this = this;
        // 如果函数因为未达到解锁时间而处于锁定状态，直接结束函数
        if (func[$IS_LOCKED] && func[$CALLER_SET] && func[$CALLER_SET].has(this))
            return;
        // 否则锁住这个函数
        func[$IS_LOCKED] = true;
        if (func[$CALLER_SET] === undefined) {
            func[$CALLER_SET] = new Set();
        }
        // 把调用者加入set
        func[$CALLER_SET].add(this);
        // 立即调用
        func.apply(this, args);
        // 等达到去抖保护时间后解锁函数，并且去掉调用者。
        setTimeout(function () {
            //func[$IS_LOCKED] = false
            delete func[$IS_LOCKED];
            var set = func[$CALLER_SET];
            // 把调用者从set移除
            set.delete(_this);
            if (set.size < 1) {
                delete func[$CALLER_SET];
            }
        }, interval);
    };
}

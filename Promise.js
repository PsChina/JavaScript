function MyPromise(func) {
    const _this = this;
    _this.onResolveCallBack = [];
    function resolve(data) {
        _this.onResolveCallBack.forEach((_func) => {
            _func(data);
        })
    }
    func(resolve.bind(_this));
}

MyPromise.prototype.then = function (func) {
    const _this = this;
    return new MyPromise((resolve) => {
        _this.onResolveCallBack.push((data) => {
            const res = func(data);
            if (res instanceof MyPromise) {
                res.then(resolve);
            } else {
                resolve(res);
            }
        })
    });
}


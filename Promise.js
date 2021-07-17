const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    static resolve(parameter) {
        if (parameter instanceof MyPromise) {
            return parameter
        }
        return new MyPromise(resolve => {
            resolve(parameter)
        })
    }
    static reject(reason) {
        if (reason instanceof MyPromise) {
            return reason
        }
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }
    status = PENDING
    onFulFilledCallbacks = []
    onRejctedCallbacks = []
    value = null
    reason = null
    constructor(fn) {
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e)
        }
    }
    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            while (this.onFulFilledCallbacks.length) {
                this.onFulFilledCallbacks.shift()(value)
            }
        }
    }
    reject(reason) {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.onRejctedCallbacks.length) {
                this.onRejctedCallbacks.shift()(reason)
            }
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        const promise = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(x, promise, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (this.status === REJECTED) {
                let callBack
                if (onRejected instanceof Function) {
                    callBack = onRejected
                } else if (onFulfilled instanceof Function) {
                    callBack = onFulfilled
                }
                queueMicrotask(() => {
                    try {
                        const x = callBack(this.reason)
                        resolvePromise(x, promise, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (this.status === PENDING) {
                this.onFulFilledCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(x, promise, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                let callBack
                if (onRejected) {
                    callBack = onRejected
                } else {
                    callBack = onFulfilled
                }
                this.onRejctedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = callBack(this.reason)
                            resolvePromise(x, promise, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })

        return promise
    }
}


function resolvePromise(x, promise, resolve, reject) {
    if (x === promise) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x)
        }
        let then
        try {
            then = x.then
        } catch (e) {
            return reject(e)
        }

        if (typeof then === 'function') {
            let called = false
            try {
                then.call(x, (value) => {
                    if (called) {
                        return
                    } else {
                        called = true
                        resolvePromise(value, promise, resolve, reject)
                    }
                }, (reason) => {
                    if (called) {
                        return
                    } else {
                        called = true
                        reject(reason)
                    }
                })
            } catch (e) {
                if (called) {
                    return
                } else {
                    called = true
                    reject(e)
                }
            }

        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}

module.exports = MyPromise;

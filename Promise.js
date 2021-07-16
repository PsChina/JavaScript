const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
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
    then(onFulfilled = value => value, onRejected = reason => { throw reason }) {

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

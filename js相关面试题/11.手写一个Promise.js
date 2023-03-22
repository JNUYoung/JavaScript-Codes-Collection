// Promise/A+规范的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this._status = PENDING
        this._resolveQueue = []
        this._rejectQueue = []
    }

    then(resolveFn, rejectFn) {
        this._resolveQueue.push(resolveFn)
        this._rejectQueue.push(rejectFn)
    }
}
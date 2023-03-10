/**
 * Promise/A+规范，重点在于 How to implement rather than how to use
 * reference: https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g
 */

/**
 * promise有三个状态：
 * pending
 * fulfilled：状态不可再变、有一个不可变的value
 * rejected：状态不可再变，有一个不可变的reason
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// promise构造函数
function Promise(f) {
    this.state = PENDING
    this.result = null
    this.callbacks = []

    // 将promise状态改变为fulfilled
    let onFulfilled = value => transition(this, FULFILLED, value)
    // 将promise状态改变为rejected
    let onRejected = reason => transition(this, REJECTED, reason)

    // 使用ignore作为标识，保证resolve或reject只能调用一次
    let ignore = false
    // resolve函数中，通过resolvePromise函数对promise状态进行解析
    let resolve = value => {
        if (ignore) return
        ignore = true
        resolvePromise(this, value, onFulfilled, onRejected)
    }
    let reject = reason => {
        if (ignore) return 
        ignore = true
        onRejected(reason)
    }

    // 将resolve和reject作为参数传入f函数，所以new Promise时，函数f内的代码会立即执行
    try {
        f(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

// promise状态迁移函数
const transition = (promise, state, result) => {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
    // 当promise状态变更时，异步清空所有callbacks
    setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0)
}

/**
 * promise.then((value) => {}, (err) => {})
 * 
 * then方法
 * 接收onFulfilled和onRejected参数
 * 表示当promise状态发生变化时执行的回调
 * then方法可以被调用很多次，每次注册一组onFulfilled和onRejected的回调
 * then方法必须返回一个promise实例
 * 
 * promise2 = promise1.then(onFullfilled, onRejected)
 */

Promise.prototype.then = function(onFulfilled, onRejected) {
    // 'then' must return a promise
    return new Promise((resolve, reject) => {
        let callback = { onFulfilled, onRejected, resolve, reject}
        // 当promise状态还处于pending时，将回调函数加入callbacks数组
        if (this.state === PENDING) {
            this.callbacks.push(callback)
        } else {
            // 当promise不再是pending状态时，表示该promise被resolve或者reject了
            // 那么就将promise的状态和结果交给 handleCallback中的逻辑进行处理
            setTimeout(() => handleCallback(callback, this.state, this.result), 0)
        }
    })
}


/**
 * handleCallback
 * 根据promise1的状态，判断变换为fulfilled还是rejected
 */
const handleCallback = function(callback, state, result) {
    let { onFulfilled, onRejected, resolve, reject } = callback
    try {
        // 如果promise1的状态已经是fulfilled，那么以promise1的resolve的结果对promise2进行resolve
        if (state === FULFILLED) {
            typeof onFulfilled === 'function' ? resolve(onFulfilled(result)) : resolve(result)
        } else if (state === REJECTED) {
            typeof onRejected === 'function' ? reject(onRejected(result)) : reject(result)
        }
    } catch (error) {
        reject(error)
    }
}

/**
 * handleCallbacks
 */
const handleCallbacks = function(callbacks, state, result) {
    while (callbacks.length) {
        handleCallback(callbacks.shift(), state, result)
    }
}


/**
 * Promise Resolution Procedure
 * [[Resolve]](promise, x)
 * 
 * 1.如果result是promise本身，抛出TypeError错误
 * 2.如果result是另一个promise，则沿用它的state和result
 * 3.如果result是一个thenable对象，先取then函数，再call这个then函数，重新进入上述过程
 * 4.如果不属于上述情况，那么这个result成为当前promise的result
 */
const resolvePromise = function(promise, result, resolve, reject) {
    if (result === promise) {
        const reason = new TypeError('Cannot fulfilled promise with itself')
        return reject(reason)
    }

    if (isPromise(result)) {
        return result.then(resolve, reject)
    }

    if (isThenable(result)) {
        try {
            const then = result.then
            if (isFunction(then)) {
                return new Promise(then.bind(result).then(resolve, reject))
            }
        } catch (error) {
            return reject(error)
        }
    }

    resolve(result)
}


/**
 * ES2015 Promises的扩充方法
 * .catch()
 * .resolve()
 * .reject()
 */
// 原始函数
function sum(a, b, c) {
    return a + b + c
}

// 柯里化函数
const currying = function(func) {
    // 返回新函数
    return function curried(...args) {
        // 如果传入的参数数量大于等于被柯里化的函数的形参数目，则直接执行func函数
        if (args.length >= func.length) {
            func.apply(this, args)
        }   
        // 如果 实际参数数量 < 形参数目
        return function(...args2) {
            return curried.apply(this, args.concat(args2))
        }
    }
}
// 手写apply方法
// 参数：this上下文对象，参数数组
Function.prototype._apply = function(context, args) {
    // 检查是否传入有效的this对象
    context = context === undefined || context === null ? window : context
    // __fn等于this，this指向调用_apply方法的函数实例
    context.__fn = this
    // 通过this的四种绑定规则中的隐式绑定，通过对象点方法的形式，将函数实例的this指向传入的context对象，并且调用该函数
    const ans = context.__fn(...args)
    // 删除掉在context对象上添加的__fn方法
    delete context.__fn
    // 返回函数调用的结果
    return ans
}

const obj = {
    name: 'zhangsan'
}

const name = 'lisi'

function logName() {
    return this.name
}

console.log(logName())
console.log(logName._apply(obj))

// call方法与apply方法实现基本一致，除了函数传参时以单个单个的参数传递

// bind方法
// 参数只有this上下文对象
// 返回值是一个新的函数，且该函数的this指向已经固定
Function.prototype._bind = function(context) {
    context = (context === undefined || context === null) ? window : context
    let _this = this    // _this指向函数实例
    // 返回的是一个新函数，新函数内部的逻辑就是以指定this执行函数实例
    return function(...args) {
        context.__fn = _this
        const ans = context.__fn(...args)
        delete context.__fn
        return ans
    }
}
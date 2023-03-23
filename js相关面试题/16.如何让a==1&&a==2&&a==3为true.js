let a
if (a == 1 && a == 2 && a == 3) {
    console.log('hello world');
}

/**
 * 如何才能输出上面的 hello world
 */

/**
 * 特点：
 * 1.使用==，可以考虑变量之间的隐式转换；
 * 2.1，2，3是连续三个数值，且每次都会对变量a进行取值；
 * 3.js代码单线程运行，且括号内的条件运算从左至右进行
 */

/**
 * 1.可以定义一种数据对象，内部封装一个数值，每次获取该变量时，让其内部的数值+1，并且通过改写toString方法进行隐式转换
 */
const a1 = {
    _val: 0,
    toString() {
        return ++this._val
    }
}
if (a1 == 1 && a1 == 2 && a1 == 3) {
    console.log('method1: hello world');
}

/**
 * 2.使用proxy代理一个目标对象，拦截对于目标对象属性的getter操作
 */
const a2 = {
    value: 0
}
const a2Proxy = new Proxy(a2, {
    get(target, property, receiver) {
        target[property] += 1
        return Reflect.get(...arguments)
    }
})
if (a2Proxy.value == 1 && a2Proxy.value == 2 && a2Proxy.value == 3) {
    console.log('method2: hello world');
}


/**
 * 3.使用对象的defineProperties方法
 */
Object.defineProperties(this, {
    _a: {
        value: 0,
        writable: true
    },
    a: {
        get() {
            return ++this._a
        }
    }
})
if (this.a == 1 && this.a == 2 && this.a == 3) {
    console.log('method3: hello world');
}


/**
 * 隐式类型转换 
 * 原型和原型链
 * 对象的属性描述符
 */

let a = []
console.log(a instanceof Object)
console.log(a instanceof Array)
console.log(typeof a)

// 检测构造函数的prototype属性是否出现在某个实例对象的原型链上
function myInstanceof(obj1, obj2) {
    let obj2Proto = obj2.prototype
    let obj1Proto = obj1.__proto__
    while (true) {
        if (!obj1Proto) return false
        if (obj1Proto === obj2Proto) {
            return true
        } else {
            obj1Proto = obj1Proto.__proto__
        }
    }
}

console.log(myInstanceof(a, Array))
console.log(myInstanceof(a, Object))
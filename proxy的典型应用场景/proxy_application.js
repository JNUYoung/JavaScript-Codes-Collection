/**
 * Javascipt元编程及抽象
 * 
 * 代理是JS对象的透明抽象层，通过定义包含若干trap的handler对象
 * 通过这些trap来拦截对于JS对象的基本操作和方法
 * 拦截和修改的逻辑需要遵循对应的“捕获器不变式 trap invariant”
 * 
 * Reflect api和proxy的捕获器搭配使用
 */

/**
 * 1.跟踪属性访问：
 *   通过proxy代理目标对象的get和set操作
 */
const user = {
    name: 'curry'
}
const userProxy = new Proxy(user, {
    // 拦截get操作可以获取哪些地方使用了该属性
    get(target, property, receiver) {
        console.log(`getting ${property} property`)
        return Reflect.get(...arguments)
    },
    // 通过拦截set属性，可以在该属性变更时通知get中收集到的依赖进行更新
    set(target, property, value,  receiver) {
        console.log(`setting ${property} property`);
        return Reflect.set(...arguments)
    }
})
console.log(userProxy.name);
console.log(userProxy.name = 'bryant');



/**
 * 2.隐藏对象的某些属性，从外部无法进行访问
 *   -- 通过代理目标对象的get属性，判断该属性是否需要隐藏
 */
const hiddenProperties = ['foo', 'bar', 'baz']
const targetObject = {
    foo: 1,
    bar: 2,
    baz: 3
}
const objProxy = new Proxy(targetObject, {
    get(target, property, receiver) {
        if (hiddenProperties.includes(property)) {
            return undefined
        } else {
            return Reflect.get(...arguments)
        }
    },
    has(target, property, receiver) {
        if (hiddenProperties.includes(property)) {
            return undefined
        } else {
            return Reflect.has(...arguments)
        }
    }
})
console.log(objProxy.foo);
console.log(objProxy.bar);
console.log(objProxy.baz);
console.log(targetObject.baz);
console.log(targetObject.baz);
console.log(targetObject.baz);


/**
 * 3.属性验证
 *   -- 通过proxy拦截set操作，保证对于对象属性的赋值符合规则
 */
const student = {
    name: undefined,
    age: undefined,
    gender: undefined
}
const studentProxy = new Proxy(student, {
    set(target, property, value, receiver) {
        if (property === 'name') {
            if (typeof value !== 'string') return false  
            return Reflect.set(...arguments)
        }
        if (property === 'age') {
            if (typeof value !== 'number') return false  
            return Reflect.set(...arguments)
        }
        if (property === 'gender') {
            if (value !== 'male' || value !== 'female') return false
            return Reflect.set(...arguments)
        }
    }
})
studentProxy.name = 123
console.log(studentProxy.name);  // undefiend
studentProxy.name = 'zhangsan'
console.log(studentProxy.name);  // zhangsan


/**
 * 4.函数参数验证
 *   -- 例如保证函数只接受某种类型的值
 */
function median(...nums) {
    return nums.sort()[Math.floor(nums.length / 2)]
}
const medianFuncProxy = new Proxy(median, {
    apply(target, thisArg, argumentsList) {
        for (const arg of argumentsList) {
            if (typeof arg !== 'number') {
                throw 'Non-number argument provided'
            }
        }
        return Reflect.apply(...arguments)
    }
})
console.log(medianFuncProxy(1,2,3));
console.log(medianFuncProxy(1,2,'3'));  // error
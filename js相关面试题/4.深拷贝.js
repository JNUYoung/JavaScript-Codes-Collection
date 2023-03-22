// 深拷贝：将一个对象完整拷贝一份，从堆内存中开辟一块新的内存空间来存放

const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
};


// 乞丐版, JSON.parse(JSON.stringify(obj))
console.log(JSON.parse(JSON.stringify(target)))

// 基础版本-递归
// 如果对象的属性是基本数据类型，则直接拷贝，若为引用数据类型，则递归调用
const deepClone = function(target) {
    if (typeof target === 'object') {
        let cloneTarget = {}
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
} 

// 兼容数组
const deepClone1 = function(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? []: {}
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
} 

// 循环引用 - 对象的属性间接或直接的引用了自身
const target1 = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target1.target = target1

/**
 * 解决循环引用问题
 * 开辟一块新的内存来存放当前对象与拷贝对象的对应关系，当需要拷贝当前对象时，先去
 * 这里找是否拷贝过，若已拷贝，则直接返回，若未拷贝，则继续拷贝
 * [循环引用的拷贝从无数次 降低到了 一次]
 */
function clone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};


const obj1 = Object.assign({}, target)
console.log(obj1 === target)
console.log(target)
obj1.field4.child = 'childobj1'
console.log(target)

// Object.assign(target, source1, source2, ...)
// 将源对象的属性合并到目标对象中
// Object.assign执行的是浅拷贝，若源对象属性为引用类型，目标对象属性的拷贝只是对其的引用
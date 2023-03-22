const arr = [1, 2, 3, 4, 5]
// 注意运算符的优先级
const evenArr = arr.filter(item => (item & 1) == 0)
console.log(evenArr)

const arr1 = arr.filter(item => item % 2 === 0)
console.log(arr1);


Array.prototype.$filter = function(callbackFn) {
    const ans = []
    for (const item of this) {
        if (callbackFn(item)) ans.push(item)
    }
    return ans
}
console.log(arr.$filter(item => (item & 1) === 0));
console.log(arr.$filter(item => (item & 1) === 1));
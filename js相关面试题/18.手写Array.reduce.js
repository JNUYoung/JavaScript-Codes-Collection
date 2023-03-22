const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce((prev, cur, curIndex, arr) => prev + cur, 0)
console.log(sum);

/**
 * 1.传入reduce的回调函数会对数组每一项运行
 * 2.回调函数接受四个值：上一个归并值，当前项，当前项的索引，数组本身
 * 3.如果没有指定初始值，那么数组第一个元素会作为初始值，此时归并从第二个元素开始
 */

Array.prototype.$reduce = function(callback, initialValue) {
    if (Object.prototype.toString.call(callback) !== "[object Function]") {
        throw new TypeError('Error! first argument should be Function type')
    }

    let ans = initialValue ?? this[0]
    let startIndex = initialValue ? 0 : 1

    for (let i = startIndex, len = this.length; i < len; i++) {
        ans = callback(ans, this[i], i, this)
    }
    return ans
}
console.log(arr.$reduce((prev, cur) => prev + cur, 0))
console.log(arr.$reduce((prev, cur) => prev + cur))
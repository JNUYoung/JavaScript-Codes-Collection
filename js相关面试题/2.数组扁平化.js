// 2023-2-6

// es6提供了flat方法用于实现数组扁平化
const arr1 = [1, 2, [3, 4, [5, 6]], '7']
// console.log(arr.flat(Infinity))


const myFlatten = function(arr = [], depth = 1) {
    const result = []; // 缓存递归结果
    // 开始递归
    (function flat(arr, depth) {
      // forEach 会自动去除数组空位
      arr.forEach((item) => {
        // 控制递归深度
        if (Array.isArray(item) && depth > 0) {
          // 递归数组
          flat(item, depth - 1)
        } else {
          // 缓存元素
          result.push(item)
        }
      })
    })(arr, depth)
    // 返回递归结果
    return result;
  }

console.log(myFlatten(arr1))

// 使用reduce
const flatten = (arr, depth = 1) => {
    if (depth <= 0) return arr
    return arr.reduce((res, cur) => res.concat(Array.isArray(cur) ? flatten(cur, depth - 1) : cur), [])
}

// const flatten = (arr, deep = 1) => {
//     if (deep <= 0) return arr;
//     return arr.reduce((res, curr) => res.concat(Array.isArray(curr) ? flatten(curr, deep - 1) : curr), [])
// }

console.log(flatten(arr1, Infinity))
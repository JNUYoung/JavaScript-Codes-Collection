/**
 * indexOf方法用于查找某个模式串在主串中是否匹配，若匹配则返回其起始索引
 */

console.log('Javascript'.indexOf('script'));    // 4
console.log('Javascript'.indexOf('pinia'));    // -1

// 若传入的参数不是字符串类型，会将传入的参数强制转换为字符串
console.log('Copyright 2023'.indexOf(2023));    // 10

// 那么当不传参数的情况呢
console.log('Javascript'.indexOf());    // -1,看起来貌似正常
console.log('MyReturnIs_undefined'.indexOf());  // 11

// 在没有显式传入参数时，默认值为undefined，经过字符串转换为'undefined'
/**
 * 包含undefined进行数值运算时，结果均会返回NaN
 */

console.log(undefined + true);
console.log(undefined + 1);
console.log(undefined + undefined);
console.log(undefined + null);

const func = () => {
    let a, b
    return a + b
}
console.log(func());
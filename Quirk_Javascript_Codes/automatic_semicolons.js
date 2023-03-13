/**
 * JS中的自动分号补全
 */

// return，throw，yield关键字后的表达式必须与该关键字位于同一行

function automatic() {
    return
        "i won't return"
}
console.log(automatic())    // undefined

/**
 * 由于上述return后的语句与return不在同一行，因此js解释器自动添加了分号；如下所示
 * function automatic() {
    return;
        "i won't return";
}
 */


// 对于左括号，若未添加分号，则连续两行内容会被当做一个函数调用表达式
let res = 1 + 2
(function() {
    console.log('111')
})()
// TypeError: 2 is not a function


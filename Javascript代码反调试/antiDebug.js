/**
 * 1.函数重定义
 * 重新定义相关函数，改变其行为，进而隐藏某些信息，或者伪造某些信息
 * 
 * 函数的原型链上具有toString方法，调用该方法会返回函数的源代码
 */

const originalConsoleLog = window.console.log
window.console.log = () => {}
const fakeLog = (arg) => {
    if (arg === 'hello world') {
        originalConsoleLog('you are the js fledgling')
    } else {
        originalConsoleLog(arg)
    }
}
window.console.log = fakeLog


/**
 * 2.断点
 * 
 * 使用定时器无限地重复执行debugger语句
 */

const infiniteDebugger = () => {
    setTimeout(() => {
        {
            while(true) eval('debugger')
        }
    }, 1000);
}


/**
 * 3.时间差异
 * 
 * 使用开发者工具调试代码时，一段代码执行的时间往往会明显变长。
 * 因此，利用一段代码执行所耗费的时间，与预估的执行时间进行比较，
 * 若大于预估时间，则意味着可能在调试器下运行
 */

setInterval(function() {
    const startTime = performance.now()
    for (let check = 0; check < 1000; check++) {
        console.log(check);
        console.clear()
    }
    if ((performance.now() - startTime) > 200) alert('debugger detected') 
}, 500)
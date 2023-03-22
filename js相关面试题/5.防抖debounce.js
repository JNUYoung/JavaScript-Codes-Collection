// 对于较短的时间内连续触发很多次的事件，只执行其中的最后一次
// 在事件被触发n秒后再执行回调，如果在这期间又再次触发了该事件，那么重新进行计时

// 应用场景
// 1.滚动内容区域和左侧导航栏高亮的对应
// 2.表单输入的监听事件处理函数

// 返回的添加了防抖之后的函数
const debounce = function(fn, timeout) {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), timeout)
    }
}
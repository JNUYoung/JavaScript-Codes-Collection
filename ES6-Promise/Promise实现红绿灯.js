// 假设红灯3s，绿灯2s,黄灯1s，
// 需求：红灯亮起3秒后，然后绿灯开始亮2s，黄灯开始亮1秒，不断循环该过程

// 模拟灯亮，传入参数：灯的颜色、亮的时间
function lightening(color, duration) {
    return new Promise(function(resolve, reject) {
        console.log(color)
        setTimeout(() => resolve(), duration)
    })
}
// lightening('red', 3000)

// 将红，绿、黄灯按顺序封装
async function trafficLight() {
    await lightening('red', 3000)
    await lightening('green', 2000)
    await lightening('yellow', 1000)
    await trafficLight()
}
trafficLight()
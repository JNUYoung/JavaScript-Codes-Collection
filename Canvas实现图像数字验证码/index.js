const choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

// 获取canvas元素
const verify = document.getElementById('img-verify-drawing')
// canvas绘制时设置的像素是真实屏幕上的像素点的数目，css设置的像素与dpr有关
// 因此会出现canvas设置像素与画布样式宽高不符的情况
const canvasWidth = verify.width
const canvasHeight = verify.height

// 生成min-max之间的随机整数
const generateRandomNum = (min, max) => {
    return parseInt(min + Math.random() * (max - min))
}

// 生成随机的rgb值
const generateRandomRGB = (min, max) => {
    const red = generateRandomNum(min, max)
    const green = generateRandomNum(min, max)
    const blue = generateRandomNum(min, max)
    return `rgb(${red},${green},${blue})`
}

// draw函数负责在canvas中绘制验证码
const draw = () => {
    // 获取canvas绘制上下文对象
    const ctx = verify.getContext('2d')
    // 1.绘制背景
    ctx.fillStyle = generateRandomRGB(180, 230)
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    let verifyCode = ''
    for (let i = 0; i < 4; i ++) {
        const text = choices[generateRandomNum(0, choices.length - 1)]
        verifyCode += text
        // 字体大小
        const fontSize = generateRandomNum(40, 50)
        // 字体旋转角度
        const deg = generateRandomNum(-30, 30)

        // 绘制文字到画布，展示在不同位置，并且旋转不同角度
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = generateRandomRGB(80, 150)

        ctx.save()
        ctx.translate(60 * i + canvasWidth / 4, canvasHeight / 2)
        ctx.rotate((deg * Math.PI) / 180)
        ctx.fillText(text, -30 + 15, -30)
        ctx.restore()
    }

    // 随机产生干扰线，通过canvas的路径绘制功能
    for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight))
        ctx.lineTo(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight))
        ctx.strokeStyle = generateRandomRGB(180, 230)
        ctx.closePath()
        ctx.stroke()
    }

    // 随机绘制干扰点
    for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(generateRandomNum(0, canvasWidth), generateRandomNum(0, canvasHeight), 1, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fillStyle = generateRandomRGB(150, 200)
        ctx.fill()
    }

    return verifyCode
}

let verifyCode = draw()

const switchBtn = document.getElementById('switch-btn')
const drawNewVerifyImage = () => {
    verifyCode = draw()
}
switchBtn.addEventListener('click', drawNewVerifyImage)


const confirmBtn = document.querySelector('#confirm-btn')
confirmBtn.addEventListener('click', () => {
    if (document.getElementById('input-verify-code').value.toLowerCase() === verifyCode.toLowerCase()) alert('ok')
    else {
        alert('wrong')
        verifyCode = draw()
    }
})
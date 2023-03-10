// 滑块元素
const drag = document.querySelector('.drag-child')
// 拼图块元素
const check = document.querySelector('.check-child')


console.log(drag)
/**
 * 鼠标按下时，添加鼠标移动事件
 * 鼠标弹起时，移除鼠标移动事件
 */

const successValid = () => console.log('success')

const dragMouseDown = event => {
    document.addEventListener('mousemove', dragMouseMove)
}

const dragMouseMove = event => {
    const { pageX } = event
    if (pageX < 0 || pageX > 350) return
    drag.style.transform = `translateX(${pageX}px)`
    check.style.transform = `translateX(${pageX}px)`
    if (pageX >= 278 && pageX <= 282) successValid()
}

const dragMouseUp = event => {
    document.removeEventListener('mousemove', dragMouseMove)
    // 获取当前 x 轴坐标
    const { pageX } = event

    if (pageX < 278 || pageX > 285) {
        // 修改可移动盒子的 x 轴坐标
        drag.style.animation = 'move 0.5s ease-in-out'
        // 修改被校验区域坐标
        check.style.animation = 'move 0.5s ease-in-out'

        // 动画结束监听回调
        const animationEnd = () => {
            // 修改可移动盒子的 x 轴坐标
            drag.style.transform = `translateX(${0}px)`
            // 修改被校验区域坐标
            check.style.transform = `translateX(${0}px)`

            // 清除动画属性
            drag.style.animation = ''
            check.style.animation = ''
            // 移出动画结束监听
            document.removeEventListener("animationend", animationEnd)
        }
        // 添加动画结束监听
        document.addEventListener("animationend", animationEnd)
    }
}

document.addEventListener('mousedown', dragMouseDown)
document.addEventListener('mouseup', dragMouseUp)
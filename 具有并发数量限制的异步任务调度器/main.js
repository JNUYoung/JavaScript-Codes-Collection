/**
 * 实现一个具有并发数量限制的异步任务调度器，可以规定最大同时运行的任务
 */

/**
 * 1.能够设置并发的异步任务的限制数量 max
 * 2.记录调度器当前并发任务数 count
 * 3.定义一个待执行的任务队列 queue
 * 4.定义add函数，处理向调度器传入异步任务的逻辑
 */

class Schedular {
    constructor(max) {
        this.max = max    // 最大并发数
        this.count = 0    // 当前并发数
        this.queue = []   // 阻塞的任务队列
    }

    /**
     * 
     * @param {*} fn 待执行的异步任务 
     */
    async add(fn) {
        /**
         * 若当前调度器达到任务数量上限，则new一个Promise实例，并将resolve函数的引用推入
         * 阻塞任务队列中。只有当这个resolve执行后，才会继续执行
         */
        if (this.count >= this.max) {
            await new Promise(resolve => this.queue.push(resolve))
        }
        this.count++
        const res = await fn()
        this.count--
        this.queue.length && this.queue.shift()()
        return res
    }
}


/**
 * test
 */

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const schedular = new Schedular(2)

const addTask = (time, val) => {
    schedular.add(() => {
        return sleep(time).then(() => console.log(val))
    })
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

/**
 * 2,3,1,4
 */
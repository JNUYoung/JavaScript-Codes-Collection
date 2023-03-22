function _setTimeout(cb, delay) {
    return new Promise((resolve,reject) => {
        setTimeout(() => cb(), delay)
        resolve()
    })
}

async function _setInterval(cb, interval) {
    await _setTimeout(cb, interval)
    await _setInterval(cb, interval)
}

const callback = function() {
    console.log('hello')
}

_setInterval(callback, 1000)
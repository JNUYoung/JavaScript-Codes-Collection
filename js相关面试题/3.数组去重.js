const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

let uniqueArr = function(arr) {
    return [...new Set(arr)]
}
console.log(uniqueArr(arr))


uniqueArr = function(arr) {
    const ans = []
    arr.forEach(item => {
        if (ans.indexOf(item) === -1) ans.push(item)
    })
    return ans
}
const arr = [1, 2, 3, '4', 5]

try {
    arr.forEach((item) => {
        if (typeof item === 'string') {
            throw new Error('forEach break')
        } else {
            item += 100
        }
    })
} catch(error) {
    console.log(error)
}

console.log(arr)
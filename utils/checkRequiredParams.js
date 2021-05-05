
module.exports = function (...args) {
    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'number') {
            args[i] = 'valid'
        }
        if (!args[i]) {
            return true
        }
    }
    return false
}
class TicTacToeError extends Error {
    constructor(...params) {
        super(...params)

        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, TicTacToeError)
        // }

        this.name = 'TicTacToeError'
        this.date = new Date()
        this.code = 400
    }
}

module.exports = TicTacToeError
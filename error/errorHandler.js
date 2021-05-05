
const ApiError = require('./ApiError')
const TicTacToeError = require('./TicTacToeError')

module.exports = async (err, req, res, next) => {
    console.log(err)
    console.log(err.message)

    if (err instanceof ApiError) {
        return res.status(err.code).json({ error: { message: err.message } });
    }

    if (err instanceof TicTacToeError) {
        return res.status(err.code).json({ error: { message: err.message } });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: { message: err.message } });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: { message: err.message } });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: { message: err?.errors?.[0].message || err.name } });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(400).json({ error: { message: err?.message || err.name } });
    }

    // return res.status(500).json({ error: { message: err } })
    return res.status(500).json({ error: { message: 'Something went wrong.' } })
}


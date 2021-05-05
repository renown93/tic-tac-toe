
const jwt = require("jsonwebtoken")
const { user: User } = require('../models')
const ApiError = require('../error/ApiError')


exports.verifyUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        const verification = jwt.verify(authorization, process.env.TOKEN)

        const user = await User.findOne({
            where: { id: verification.id },
            include: [{ all: true }]
        })

        if (user) {
            req.user = user
            return next()
        }

        return next(new ApiError.userNotFound())

    } catch (err) {
        return next(err)
    }
}

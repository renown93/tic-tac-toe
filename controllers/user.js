const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user: User } = require('../models/index')
const ApiError = require('../error/ApiError')
const checkRequiredParams = require('../utils/checkRequiredParams')

exports.register = async (req, res, next) => {
    try {
        let { username, password } = req.body

        if (checkRequiredParams(username, password)) {
            return next(ApiError.missingParameter("username:string and password:string are required parameters."))
        }

        const hashedPw = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPw,
        })

        const newUser = await User.findOne({
            where: { id: user.id }
        })

        return res.json(newUser)

    } catch (err) {
        return next(err)
    }

}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (checkRequiredParams(username, password)) {
            return next(ApiError.missingParameter("username:string and password:string are required parameters."))
        }
        const user = await User.findOne({ where: { username } })


        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user.get(),
                //@ts-ignore
                process.env.TOKEN,
                {
                    algorithm: "HS256",
                    expiresIn: "12h"
                }
            );
            return res.status(200).json({ user, token });
        }

        return next(ApiError.userNotFound());
    } catch (err) {
        return next(err)
    }
}
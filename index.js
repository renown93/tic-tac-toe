require('dotenv').config()
const express = require('express')
const { sequelize } = require('./models')
const errorHandler = require('./error/errorHandler')
const app = express()
const user = require('./routes/user')
const game = require('./routes/game')
const { verifyUser } = require('./middlewares/authentication')

app.use(express.json({ limit: "2mb" }));


app.use("/user", user)
app.use("/game", verifyUser, game)

app.get("/healthCheck", (req, res) => {
    res.json('Server is running.')
})

app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
})

app.use(errorHandler)

app.listen(process.env.PORT, async () => {
    await sequelize.authenticate()
    console.log(`Server is running on port ${process.env.PORT}`)
})
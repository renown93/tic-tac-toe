const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { game: Game } = require('../models/index')
const ApiError = require('../error/ApiError')
const checkRequiredParams = require('../utils/checkRequiredParams')
const TickTacToeGame = require('../lib/TickTacToeGame')


exports.startGame = async (req, res, next) => {
    try {
        const { player1, player2 } = req.body

        if (checkRequiredParams(player1, player2)) {
            return next(ApiError.missingParameter("player1:string and player2:string is required."))
        }

        new TickTacToeGame([], player1, player2)
        const newGame = await Game.create({ player1, player2 })

        return res.json(await Game.findByPk(newGame.id, { include: { all: true } }))

    } catch (err) {
        return next(err)
    }

}

exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.findAll({ include: { all: true } })
        return res.json(games)

    } catch (err) {
        return next(err)
    }

}

exports.getGameById = async (req, res, next) => {
    try {
        const { gameId } = req.params
        const games = await Game.findByPk(gameId, { include: { all: true } })
        return res.json(games)

    } catch (err) {
        return next(err)
    }

}

exports.playerMove = async (req, res, next) => {
    try {
        const { position } = req.body
        const { gameId } = req.params
        if (checkRequiredParams(position)) {
            return next(ApiError.missingParameter("position:number[1-8] is required."))
        }

        const gameState = await Game.findByPk(gameId, { include: { all: true } })

        if (gameState.get().status === 'FINISHED') {
            return next(ApiError.gameHasAlreayFinished())
        }

        const game = new TickTacToeGame([...gameState.get().gameMoves], gameState.get().player1, gameState.get().player2)
        const gameStatus = game.move(position)
        await gameState.createGameMove(gameStatus.newMove)

        if (gameStatus.winner) {
            await gameState.update(
                {
                    status: 'FINISHED',
                    winner: gameStatus.winner
                },
                {
                    fields: ["status", "winner"]
                }
            )
        }

        if (gameStatus.isDraw) {
            await gameState.update(
                {
                    status: 'FINISHED',
                    winner: "DRAW"
                },
                {
                    fields: ["status", "winner"]
                }
            )
        }

        return res.json(await Game.findByPk(gameId, { include: { all: true } }))

    } catch (err) {
        return next(err)
    }

}

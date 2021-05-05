const { chunk } = require('lodash')
const TicTacToeError = require('../error/TicTacToeError')
class TickTacToeGame {
    gameMoves = [];
    status;
    errors;
    winner = null;
    isDraw = false;
    players = [
        {
            symbol: 'X',
            name: ''
        },
        {
            symbol: 'O',
            name: ''
        }
    ]

    constructor(gameMoves, player1, player2) {
        this.gameMoves = gameMoves || []
        this.players[0].name = player1 || "player1"
        this.players[1].name = player2 || "player2"
        this._checkUniqueName()
    }

    move = (position) => {
        const player = this._findWhoseTurn()
        this._checkMovePosition(position)
        this._checkRound(player)
        const newMove = { position, player: player.name, symbol: player.symbol }
        this.gameMoves.push(newMove)
        const status = this._checkWinner()

        if (status.winner) {
            this.winner = status.winner
        }

        if (status.isDraw) {
            this.isDraw = status.isDraw
        }

        return { newMove, winner: this.winner, isDraw: this.isDraw }
    }

    _checkMovePosition = (position) => {
        const previusMoves = this.gameMoves.map(i => i.position)

        if (position > 8 || position < 0) {
            throw new TicTacToeError('Positions can not out of range [0-8]')
        }

        if (previusMoves.includes(position)) {
            throw new TicTacToeError('position was played before')
        }

    }

    _checkRound = (playerName) => {
        if (!this.gameMoves.length) {
            return
        }
        const lastPlayerName = this.gameMoves[this.gameMoves.length - 1].playerName
        if (playerName === lastPlayerName) {
            throw new TicTacToeError(`It's not ${playerName}'s turn.`)
        }
    }

    _checkWinner = () => {
        let board = new Array(9).fill(null)

        this.gameMoves.forEach(i => {
            board[i.position] = i.symbol
        })
        board = board.map(i => i ? i : Symbol())


        //Check for row wins
        const rows = chunk(board, 3)
        for (let row of rows) {
            if (row[0] === row[1] && row[1] === row[2]) {
                return {
                    winner: this._getWinnerName()
                }
            }
        }
        //Check for column wins
        const columns = []
        board.forEach((i, index) => {
            if (index > 2) {
                return
            }
            let column = []
            column.push(board[index], board[index + 3], board[index + 6])
            columns.push(column)
        })
        for (let column of columns) {
            if (column[0] === column[1] && column[1] === column[2]) {
                return {
                    winner: this._getWinnerName()
                }
            }
        }

        //Check for cross wins
        if (board[0] === board[4] && board[4] === board[8]) {
            return {
                winner: this._getWinnerName()
            }
        }

        if (board[2] === board[4] && board[4] === board[6]) {
            return {
                winner: this._getWinnerName()
            }
        }
        console.log(this.gameMoves.length)
        //check for draw
        if (this.gameMoves.length === 9) {
            return { winner: null, isDraw: true }
        }
        return { winner: null, isDraw: false }
    }

    _checkUniqueName = () => {
        if (this.players[0].name === this.players[1].name)
            throw new TicTacToeError('Player names must be unique')
    }

    _findWhoseTurn = () => {
        if (!this.gameMoves.length) {
            return this.players[0]
        }
        const lastPlayerName = this.gameMoves[this.gameMoves.length - 1].player
        const turn = this.players.find((i) => i.name !== lastPlayerName)
        return turn
    }

    _getWinnerName = () => {
        return this.gameMoves[this.gameMoves.length - 1].player
    }
}

// const game = new TickTacToeBoard([], 'ahmet', 'mehmet')

module.exports = TickTacToeGame
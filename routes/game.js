const express = require('express')
const { getAllGames, startGame, playerMove, getGameById } = require('../controllers/game')

const router = express.Router();

router.get("/", getAllGames)
router.post("/start", startGame)
router.post("/move/:gameId", playerMove)
router.get("/:gameId", getGameById)

module.exports = router
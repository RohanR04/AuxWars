const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/random-artist', gameController.getRandomArtist);

module.exports = router;

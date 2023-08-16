const express = require('express');
const router = express.Router();

const {
    getAnimes, 
    getAnime
} = require('../controllers/animeController');

// GET all animes
router.get('/', getAnimes);

// GET a single anime
router.get('/:id', getAnime);

module.exports = router;
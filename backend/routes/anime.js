const express = require('express');
const router = express.Router();

const {
    getAnimes, 
    getAnime,
    getAnimeSearch
} = require('../controllers/animeController');

// GET all animes
router.get('/', getAnimes);

router.get('/search', getAnimeSearch);

// GET a single anime
router.get('/:id', getAnime);
module.exports = router;
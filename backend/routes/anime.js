const express = require('express');
const router = express.Router();

const {
    getAnimes, 
    getAnime,
    getAnimeSearch,
    getTopAnime
} = require('../controllers/animeController');

// GET all animes
router.get('/', getAnimes);

router.get('/search', getAnimeSearch);

router.get('/search/top_animes', getTopAnime);

// GET a single anime
router.get('/:id', getAnime);
module.exports = router;
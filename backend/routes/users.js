const express = require('express');
const User = require('../models/userModel');
const requireAuth = require('../middleware/requireAuth')

const {
    loginUser,
    signupUser,
    getAnimeList,
    getFavoriteList,
    addAnimeList,
    addFavoriteList
} = require('../controllers/userController');

const router = express.Router()

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// GET user anime list
router.get('/animelist', getAnimeList);

// GET user favorite list
router.get('/favoritelist', getFavoriteList);

// require auth for these user routes
router.use(requireAuth);

// POST user anime list
router.post('/animelist', addAnimeList);

// POST user favorite list
router.post('/favoritelist', addFavoriteList);

module.exports = router;
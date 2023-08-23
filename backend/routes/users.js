const express = require('express');
const User = require('../models/userModel');
const requireAuth = require('../middleware/requireAuth')

const {
    loginUser,
    signupUser
} = require('../controllers/userController');

const router = express.Router()

// require auth for all user routes
router.use(requireAuth);

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

module.exports = router;
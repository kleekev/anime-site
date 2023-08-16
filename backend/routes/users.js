const express = require('express');
const User = require('../models/userModel');
const {
    getUser,
    createUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all Users'});
});

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a user

router.delete('/', deleteUser);

module.exports = router;
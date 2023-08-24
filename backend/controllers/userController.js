const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);
        const username = user.username;

        res.status(200).json({ username, email, token});
    } catch (error) {
        res.status(400).json({errror: error.message});
    }
}

// signup user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const user = await User.signup(username, email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({username, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get user anime list
const getAnimeList = async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await User.findOne({ _id });

        if (!user) {
            throw Error('No such user');
        }
        const animeList = user.animeList
        res.status(200).json({animeList});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get user favorites list
const getFavoriteList = async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await User.findOne({ _id });

        if (!user) {
            throw Error('No such user');
        }
        const favoriteList = user.favoriteList
        res.status(200).json({favoriteList});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addAnimeList = async (req, res) => {
    const { _id, anime_id, score, status } = req.body;

    try {
        const user = await User.findOne({ _id: _id});

        const animeList = user.animeList;
        const anime = animeList.find((item) => item.anime_id === anime_id);

        if (anime) {
            throw Error('Anime already added');
        }
        
        user.animeList.push({anime_id, score, status});
        await user.save();
        res.status(200).json({anime_id, score, status});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addFavoriteList = async (req, res) => {
    const { _id, anime_id} = req.body;

    try {
        const user = await User.findOne({ _id: _id});

        const favoriteList = user.favoriteList;
        const favoriteAnime = favoriteList.find((item) => item === anime_id);

        if (favoriteAnime) {
            throw Error('Anime already added');
        }
        
        user.favoriteList.push(anime_id);
        await user.save();
        res.status(200).json({anime_id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginUser,
    signupUser,
    getAnimeList,
    getFavoriteList,
    addAnimeList,
    addFavoriteList
}
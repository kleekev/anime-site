const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { getAnimeDetails } = require('./animeController');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d' });
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
        res.status(400).json({error: error.message});
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
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw Error('No such user');
        }
        let animelist = user.animeList
        animelist = await Promise.all(animelist.map(async (anime) =>  {
            const details = await getAnimeDetails(anime.anime_id);
            const anime_id = anime.anime_id;
            const score = anime.score;
            const status = anime.status;
            const progress = anime.progress;
            return {...details, anime_id, score, status, progress};
        }));

        
        res.status(200).json(animelist);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get user favorites list
const getFavoriteList = async (req, res) => {
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw Error('No such user');
        }
        const favoriteList = user.favoriteList
        res.status(200).json(favoriteList);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addAnimeList = async (req, res) => {
    const { email, anime_id, score, status, episodes } = req.body;

    try {
        const user = await User.findOne({ email });

        const animeList = user.animeList;
        const anime = animeList.filter((item) => item.anime_id === anime_id);

        if (anime.length > 0) {
            throw Error('Anime already added');
        }
        
        user.animeList.push({anime_id, score, status, progress:episodes });
        await user.save();
        res.status(200).json({anime_id, score, status, episodes});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addFavoriteList = async (req, res) => {
    const { email, anime_id } = req.body;

    try {
        const user = await User.findOne({ email });

        const favorites = user.favoriteList;
        const favoriteAnime = favorites.filter((item) => item === anime_id);

        if (favoriteAnime.length > 0) {
            throw Error('Anime already added');
        }
        
        user.favoriteList.push(anime_id);
        await user.save();
        res.status(200).json({anime_id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getAnimeFromList = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findOne({ email });

        const animeList = user.animeList;
        const anime = animeList.filter((item) => item.anime_id === Number(id));


        if (!user) {
            throw Error('User does not exist');
        }
        
        anime.length > 0 ? res.status(200).json({doesExist: true}) : 
                           res.status(200).json({doesExist : false});
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
    addFavoriteList,
    getAnimeFromList
}
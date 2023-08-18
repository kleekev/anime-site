const {MongoClient} = require('mongodb');

// Get all animes
const getAnimes = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        // Connect to the MongoDB cluster
        client.connect();
    } catch (e) {
        console.error(e);
    }
    const animeCollection = client.db('anime').collection('anime');

    const animes = await animeCollection.find({}).project({title: 1});
    const results = await animes.toArray();
    res.status(200).json(results);
    client.close();

}

// Get a single anime
const getAnime = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        // Connect to the MongoDB cluster
        client.connect();
    } catch (e) {
        console.error(e);
    }
    const animeCollection = client.db('anime').collection('anime');

    const { id } = req.params;
    const anime = await animeCollection.findOne({anime_id: Number(id)});
    if (!anime) {
        return res.status(404).json({error: 'No such anime'}); 
    }
    res.status(200).json(anime);
    client.close();
}

const getAnimeSearch = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        // Connect to the MongoDB cluster
        client.connect();
    } catch (e) {
        console.error(e);
    }
    const animeCollection = client.db('anime').collection('anime');

    const {season , year} = req.query;
    const animes = await animeCollection.find({start_year: Number(year), start_season: season}).project({title: 1, main_picture: 1});
    const results = await animes.toArray();
    res.status(200).json(results);
    client.close();
}
module.exports = {
    getAnimes,
    getAnime,
    getAnimeSearch
}

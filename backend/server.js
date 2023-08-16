require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const animeRoutes = require('./routes/anime');
const userRoutes = require('./routes/users');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/animes', animeRoutes);
app.use('/api/users', userRoutes);

// connect to database
async function connectToMongoDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Listening on port ', process.env.PORT);
    });
}
connectToMongoDB().catch((err) => console.log(err));



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    animeList: [{
        _id: false,
        anime_id: {type: Number, required: true},
        progress: {type: Number},
        score: {type: Number},
        status: {type: String}
    }],
    favoriteList: [Number]
});

// signup method
UserSchema.statics.signup = async function(username, email, password) {
    // validation
    if (!email || !password || !username) {
        throw Error('All fields must filled');
    }
    if (username.length > 20) {
        throw Error('Username is too long');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const existingEmail = await this.findOne({ email });
    const existingUsername = await this.findOne({ username });

    if (existingEmail) {
        throw Error('Email already in use');
    }

    if (existingUsername) {
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hashedPassword });

    return user;
}

// login method
UserSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must filled');
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email');
    }

    const doesMatch = await bcrypt.compare(password, user.password);

    if (!doesMatch) {
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', UserSchema);
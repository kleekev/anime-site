const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
});

// signup method
UserSchema.statics.signup = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const existingEmail = await this.findOne({ email })

    if (existingEmail) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });

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
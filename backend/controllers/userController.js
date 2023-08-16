const User = require('../models/userModel');

// Get a single user
const getUser = async (req, res) => {
    const {id} = req.body;

    if (!mongoose.Types.ObjectID.isValid(id)) {
        return res.status(404).json({error: 'No such User'});
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({error: 'No such User'}); 
    }
    res.status(200).json(user);
}

// Create a user
const createUser = async (req, res) => {
    const {userName, password} = req.body;

    try {
        const user = await User.create({userName, password});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    const {id} = req.body;

    if (!mongoose.Types.ObjectID.isValid(id)) {
        return res.status(404).json({error: 'No such User'});
    }

    const user = await User.findOneAndDelete({_id: id});

    if (!user) {
         res.status(400).json({error: 'No such User'});
    }
    res.status(200).json(user);
}
module.exports = {
    getUser,
    createUser,
    deleteUser
}
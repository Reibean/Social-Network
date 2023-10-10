const { User, Thought } = require('../models');
const { findOneAndUpdate } = require('../models/users');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) {
                res.status(404).json({ message: 'No users match this id' });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
    }
},

async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

async updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No users match this id' });
            return;
        }
        res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
    }
},

async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            res.status(404).json({ message: 'No users match this id' });
            return;
        }
        await Thought.deleteMany({ username: user.username });
        return res.json(user)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

async addFriend(req, res) {
    try {
        const user = await findOneAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No users match this id' });
        }
        return res.json(user);
    }  catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

async removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No users match this id' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    }
};
const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }).populate('reactions');
            if (!thought) {
                res.status(404).json({ message: 'No thoughts match this id'});
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addThought(req, res) {
        try {
            const thought = new Thought({
                thoughtText: req.body.thoughtText,
                username: req.body.username,
            });

            const savedThought = await thought.save();
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: savedThought._id } },
                { new: true }
            );

            res.json(savedThought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
            }
        },

        async updateThought(req, res) {
            try {
                const updatedThought = await Thought.findOneAndUpdate(
                    { _id: req.params.id },
                    req.body,
                    { new: true, runValidators: true }
                );
                if (!updatedThought) {
                    res.status(404).json({ message: 'No thoughts match this id' });
                }
                res.json(updatedThought);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },

        async deleteThought(req, res) {
            try {
                const thought = await Thought.findOneAndDelete({ _id: req.params.id });
                if (!thought) {
                    res.status(404).json({ message: 'No thoughts match this id' });
                    return;
                }

                await User.updateOne(
                    { thoughts: req.params.id },
                    { $pull: { thoughts: req.params.id } }
                );
                res.json({ message: 'This thought was deleted' });
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },

        async addReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: req.body } },
                    { new: true, runValidators: true }
                );
                if (!thought) {
                    res.status(404).json({ message: 'No thoughts match this id'});
                    return;
                }
                res.json(thought);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },

        async deleteReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: {reactionId: req.params.reactionId } } },
                    { new: true }
                );
                if (!thought) {
                    res.status(404).json({ message: 'No thoughts match this id' });
                    return;
                }
                res.json(thought);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        }
    };
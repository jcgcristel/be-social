const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(e => {
            console.log(e);
            res.status(400).json(e);
        });
    },

    // get one thought by id
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { username: body.username},
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(e => {
                console.log(e);
                res.status(400).json(e)
            })
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(e => res.status(400).json(e))        
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Thought not found.' });
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username},
                    { $pull: { thoughts: params.id } },
                    { new: true }
                )
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found.'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(e => res.status(404).json(e));
    },

    // add reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(e => res.json(e));
    },

    // remove reaction to a thought
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(e => res.json(e));
    }
}

module.exports = thoughtController;
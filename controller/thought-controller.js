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
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found.'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(e => res.status(404).json(e));
    }
}

module.exports = thoughtController;
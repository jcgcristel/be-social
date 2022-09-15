const { User } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });

    },

    // Get one user by id
    getUserById({params}, res) {
        User.find({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },

    // Create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(e => res.status(400).json(e));

    },

    // Update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true })
            .then (dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(e => res.status(400).json(e));
    },

    // Delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(e => res.status(400).json(e));
    },

    // Add a friend's id to a user
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: _id }},
            { new: true },
            { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found.'})
                }
                res.json(dbUserData);
            })
            .catch(e => res.status(400).json(e));
    },

    // Remove a friend's id from a user
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true },
            { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found.'})
                }
                res.json(dbUserData);
            })
            .catch(e => res.status(400).json(e));
    }
}

module.exports = userController;
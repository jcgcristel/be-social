const { User } = require('../models');

const UserController = {
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
        
    },

    // Delete user by id
    deleteUser() {

    }

    // BONUS: REMOVE A USER'S ASSOCIATED THOUGHTS WHEN DELETED
}
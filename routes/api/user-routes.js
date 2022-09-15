const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../controller/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


// /api/users/:id
router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/');

module.exports = router;
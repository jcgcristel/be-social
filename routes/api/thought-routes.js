const router = require('express').Router();

const {
    getAllThought,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought
} = require('../../controller/thought-controller');

// /api/thoughts
router 
    .route('/')
    .get(getAllThought)
    .post(createThought)

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router;
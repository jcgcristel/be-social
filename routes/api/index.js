const router = require('express').Router();

const userRoutes = reuqire('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
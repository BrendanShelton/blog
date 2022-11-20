const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/posts', projectRoutes);

module.exports = router;

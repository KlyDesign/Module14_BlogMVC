const router = require('express').Router();
const authRout = require('./authRout');
const postRout = require('./postRout');
router.use('/users', authRout);
router.use('/post', postRout);

module.exports = router;

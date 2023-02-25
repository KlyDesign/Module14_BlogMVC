const router = require('express').Router();
const authRout = require('./authRout');
const postRout = require('./postRout');
const commentRout = require('./commentRout');

router.use('/users', authRout);
router.use('/post', postRout);
router.use('/comment', commentRout);

module.exports = router;

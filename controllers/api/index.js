const router = require('express').Router();
const authRout = require('./authRout');
router.use('/login', authRout);

module.exports = router;

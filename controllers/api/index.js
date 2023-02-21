const router = require('express').Router();
const authRout = require('./authRout');
router.use('/users', authRout);
module.exports = router;

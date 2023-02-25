const router = require('express').Router();

const viewRout = require('./viewRout.js');
const dashRout = require('./dashRout.js');
const postRout = require('./postRout.js');
const apiRout = require('./api');

router.use('/', viewRout);
router.use('/api', apiRout);
router.use('/dashboard', dashRout);
router.use('/post', postRout);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
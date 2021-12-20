const router = require('express').Router();
const thought = require('./thought');
const users = require('./users');

//router.use('/thoughts', thought);
router.use('/thoughts', thought)
router.use('/users', users);

module.exports = router;
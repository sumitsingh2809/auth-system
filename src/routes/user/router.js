const router = require('express').Router();
const { authorize } = require('../../middlewares/auth');
const { searchUser } = require('./user.controller');

router.get('/search', authorize, searchUser);

module.exports = router;

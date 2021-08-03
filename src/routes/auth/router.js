const router = require('express').Router();
const { authorize } = require('../../middlewares/auth');
const { register, login, logout } = require('./auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authorize, logout);

module.exports = router;

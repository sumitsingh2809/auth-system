const express = require('express');
const router = express.Router();

const authRoute = require('./auth/router');
const userRoute = require('./user/router');

router.get('/', (req, res) => {
    res.send('server is up and running');
});
router.use('/auth', authRoute);
router.use('/users', userRoute);

module.exports = router;

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

// protect routes
exports.authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Set token from Bearer token in header
            token = req.headers.authorization.split(' ')[1];
        }

        // Make sure token exists
        if (!token) {
            return next(new ErrorResponse('Not Authorized to access this route', 401));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorResponse(`User Not Exist With Given Creds`, 404));
        }
        if (!user.isLoggedin) {
            return next(new ErrorResponse(`Not Authorized to access this route`, 401));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new ErrorResponse('Not Authorized to access this route', 401));
    }
};

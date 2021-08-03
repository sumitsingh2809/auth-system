const User = require('../../models/user');
const ErrorResponse = require('../../utils/errorResponse');
const authValidator = require('./auth.validator');

exports.register = async (req, res, next) => {
    try {
        const userData = await authValidator.register().validateAsync(req.body);

        const user = await User.create(userData);
        return res.json({ success: true, data: user });
    } catch (err) {
        return next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = await authValidator.login().validateAsync(req.body);

        // Validate email and password
        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        // check for User
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

        user.isLoggedin = true;
        await user.save();
        // Create token
        const token = user.getSignedJwtToken();
        res.json({ success: true, token });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.updateOne({ _id }, { $set: { isLoggedin: false } });
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};

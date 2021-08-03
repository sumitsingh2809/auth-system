const User = require('../../models/user');
const userValidator = require('./user.validator');

exports.searchUser = async (req, res, next) => {
    try {
        const query = await userValidator.searchUser().validateAsync(req.query);
        const filter = [];
        if (query.name) filter.push({ name: { $regex: `^${query.name}`, $options: 'i' } });
        if (query.contact) filter.push({ contact: { $regex: `^${query.contact}`, $options: 'i' } });

        const users = await User.find({ $or: filter });
        return res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

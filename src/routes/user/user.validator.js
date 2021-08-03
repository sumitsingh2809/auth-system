const Joi = require('joi');

exports.searchUser = () => {
    return Joi.object()
        .keys({
            name: Joi.string().optional(),
            contact: Joi.string().optional(),
        })
        .or('name', 'contact');
};

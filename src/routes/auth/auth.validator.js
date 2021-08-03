const Joi = require('joi');

exports.register = () => {
    return Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        contact: Joi.string().required(),
        address: Joi.string().optional(),
        gender: Joi.string().allow('male', 'female').required(),
        country: Joi.string().optional(),
    });
};

exports.login = () => {
    return Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
};

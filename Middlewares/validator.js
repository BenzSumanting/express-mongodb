const Joi = require('joi');

exports.signupSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] },
        }),

    password: Joi.string()
        .required()
});

exports.signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] },
        }),

    password: Joi.string()
        .required()
});
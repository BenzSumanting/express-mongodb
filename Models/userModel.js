const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email is Required'],
        trim: true,
        unique: [, 'Email must be unique'],
        minLength: [5, "Email must 5"],
        lowercase: true
    },

    password: {
        type: String,
        required: [true, "Password must provided"],
        trim: true,
        select: false
    },

    verified: {
        type: Boolean,
        default: false
    },

    verificationCode: {
        type: String,
        select: false,
    },

    verificationCodeValidation: {
        type: Number,
        select: false
    },

    forgotPasswordCode: {
        type: String,
        select: false,
    },

    forgotPasswordCodeValidation: {
        type: Number,
        select: false,
    },
}, {
    timestamp: true
});

module.exports = mongoose.model("User", userSchema);
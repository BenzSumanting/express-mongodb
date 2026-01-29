const { exist } = require("joi");
const { signupSchema, signinSchema } = require("../Middlewares/validator");
const User = require("../Models/userModel");
const { doHash, doHashValidation } = require("../Utils/hashing");
const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    try {
        // ✅ validate correctly
        const { error, value } = signupSchema.validate({ email, password });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email });

        console.log(existingUser);

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await doHash(password, 10);

        console.log(hashedPassword);

        const newUser = new User({
            email: value.email,
            password: hashedPassword
        });

        const result = await newUser.save();
        result.password = undefined; // hide password in response

        return res.status(201).json({ success: true, data: result });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {

        const { error, value } = signinSchema.validate({ email, password });

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const user = await User.findOne({ email }).select('+password');

        const result = await doHashValidation(password, user.password);

        if (!user || !result) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            verified: user.verified
        }, process.env.JWT_SECRET);

        res.cookie('Authorization', 'Bearer' + token,
            {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'
            }).json({
                success: true,
                token,
                message: 'Logged in successfully'
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.signOut = async (req, res) => {
    res.clearCookie('Authentication').json({ success: true, message: "Logout success" })
};

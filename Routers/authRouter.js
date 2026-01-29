const express = require('express');

const authController = require('../Controllers/AuthController');

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signIn);

module.exports = authRouter;
const express = require('express');

const authController = require('../Controllers/AuthController');

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signIn);
authRouter.post('/signout', authController.signOut);
authRouter.get('/user', authController.findAll);
authRouter.get('/user/:id', authController.findOne);

module.exports = authRouter;
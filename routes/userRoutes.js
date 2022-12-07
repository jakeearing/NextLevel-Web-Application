const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogin, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.get('/new', isGuest, controller.new);

router.post('/', isGuest, validateSignUp, validateResult, controller.create);

router.get('/login', isGuest, controller.getUserLogin);

router.post('/login', logInLimiter, isGuest, validateLogin, validateResult, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isHost} = require('../middlewares/auth');
const {validateId, validateConnection, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, validateConnection, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

router.put('/:id', validateId, isLoggedIn, isHost, validateConnection, controller.update);

router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

module.exports = router;
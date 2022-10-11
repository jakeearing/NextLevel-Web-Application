const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /connections: Shows user all connections
router.get('/', controller.index);

router.get('/about', controller.about);

router.get('/contact', controller.contact);

module.exports = router;
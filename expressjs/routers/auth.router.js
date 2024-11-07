const express = require('express'),
	router = express.Router(),
	authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.put('/set-password', authController.setPassword);

module.exports = router;

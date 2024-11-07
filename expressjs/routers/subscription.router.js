const express = require('express'),
	router = express.Router(),
	subscriptionController = require('../controllers/subscription.controller');

router.post('/', subscriptionController.sendSubscription);

module.exports = router;

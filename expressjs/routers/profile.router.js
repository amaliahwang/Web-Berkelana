const express = require('express'),
	router = express.Router(),
	profileController = require('../controllers/profile.controller'),
	{ authenticateUser } = require('../middlewares/authentication');

router.get('/', authenticateUser, profileController.getMyProfile);
router.put('/update-profile', authenticateUser, profileController.updateMyProfile);
router.put('/update-password', authenticateUser, profileController.updatePassword);

module.exports = router;

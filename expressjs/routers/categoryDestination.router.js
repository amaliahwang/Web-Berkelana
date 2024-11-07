const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	categoryDestinationController = require('../controllers/categoryDestination.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.get('/', categoryDestinationController.getAllCategoryDestination);
router.post('/', authenticateUser, checkLevel, multer.thumbnailCategoryDestination.single('thumbnail'), categoryDestinationController.createCategoryDestination);
router.get('/:id', categoryDestinationController.getCategoryDestinationById);
router.delete('/', authenticateUser, checkLevel, categoryDestinationController.deleteCategoryDestination);

module.exports = router;

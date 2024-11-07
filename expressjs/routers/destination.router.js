const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	destinationController = require('../controllers/destination.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.get('/', destinationController.getAllDestination);
router.post('/', authenticateUser, checkLevel, multer.thumbnailDestination.single('thumbnail'), destinationController.createDestination);
router.get('/:destinationId', destinationController.getDestinationById);
router.put('/:destinationId', authenticateUser, checkLevel, multer.thumbnailDestination.single('thumbnail'), destinationController.updateDestination);
router.delete('/:destinationId', authenticateUser, checkLevel, destinationController.deleteDestinationById);
router.post('/:destinationId/add-gallery', authenticateUser, checkLevel, multer.galleryImageDestination.single('image'), destinationController.addGalleryDestination);
router.delete('/:destinationId/delete-gallery/:galleryId', authenticateUser, checkLevel, destinationController.deleteGalleryDestinationById);

module.exports = router;
